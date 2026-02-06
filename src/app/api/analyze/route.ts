import { NextRequest, NextResponse } from 'next/server';
import { extractText } from '@/lib/extractText';
import { analyzeCV } from '@/lib/ai';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const jobDescription = formData.get('jobDescription') as string | null;
    const fingerprint = formData.get('fingerprint') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado.' },
        { status: 400 }
      );
    }

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Check usage limit
    const supabase = await createClient();

    const { data: existingUsage } = await supabase
      .from('usage')
      .select('*')
      .or(`fingerprint.eq.${fingerprint},ip_address.eq.${ip}`)
      .single();

    if (existingUsage && existingUsage.analysis_count >= 10) {
      return NextResponse.json(
        {
          error: 'Você já utilizou sua análise gratuita. Entre em contato para mais análises.',
          limitReached: true
        },
        { status: 403 }
      );
    }

    // Extract text from file
    const cvText = await extractText(file);

    if (!cvText || cvText.trim().length < 50) {
      return NextResponse.json(
        { error: 'O arquivo parece estar vazio ou tem muito pouco conteúdo.' },
        { status: 400 }
      );
    }

    // Analyze with AI
    const analysis = await analyzeCV(cvText, jobDescription || undefined);

    // Record usage
    if (existingUsage) {
      await supabase
        .from('usage')
        .update({
          analysis_count: existingUsage.analysis_count + 1,
          last_analysis_at: new Date().toISOString(),
        })
        .eq('id', existingUsage.id);
    } else {
      await supabase.from('usage').insert({
        fingerprint: fingerprint || 'unknown',
        ip_address: ip,
        analysis_count: 1,
        last_analysis_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error in analyze API:', error);
    const message = error instanceof Error ? error.message : 'Erro interno do servidor.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}