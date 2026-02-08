import { NextRequest, NextResponse } from 'next/server';
import { extractText } from '@/lib/extractText';
import { analyzeCV } from '@/lib/ai';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

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

    // Get user from session
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Check usage limit
    if (user) {
      // Usuário autenticado - verificar na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('subscription_tier, free_analyses_used')
        .eq('id', user.id)
        .single();

      if (userError) {
        console.error('Error fetching user:', userError);
        console.error('User ID:', user.id);
        console.error('Isso pode significar que a tabela users não existe ou o usuário não tem registro.');
        return NextResponse.json(
          { error: 'Erro ao verificar usuário. Verifique se executou o schema do banco (supabase_schema.sql).' },
          { status: 500 }
        );
      }

      console.log('User data:', userData);
      console.log(`User ${user.email} - Tier: ${userData.subscription_tier}, Analyses used: ${userData.free_analyses_used}`);

      // Verificar limites
      if (userData.subscription_tier === 'free' && userData.free_analyses_used >= 1) {
        return NextResponse.json(
          {
            error: 'Você já utilizou sua análise gratuita. Faça upgrade para Pro para análises ilimitadas.',
            limitReached: true
          },
          { status: 403 }
        );
      }
    } else {
      // Usuário não autenticado - verificar por fingerprint
      if (!fingerprint) {
        return NextResponse.json(
          { error: 'Identificação do dispositivo não encontrada.' },
          { status: 400 }
        );
      }

      const { data: existingAnalyses, error: analysesError } = await supabase
        .from('analyses')
        .select('id')
        .eq('fingerprint', fingerprint)
        .is('user_id', null);

      if (analysesError) {
        console.error('Error checking fingerprint:', analysesError);
      }

      console.log(`Fingerprint ${fingerprint} - Analyses count: ${existingAnalyses?.length || 0}`);

      if (existingAnalyses && existingAnalyses.length >= 1) {
        return NextResponse.json(
          {
            error: 'Você já utilizou sua análise gratuita. Crie uma conta para continuar.',
            limitReached: true,
            requiresAuth: true
          },
          { status: 403 }
        );
      }
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

    // Save analysis to database
    const analysisRecord = {
      user_id: user?.id || null,
      fingerprint: user ? null : fingerprint,
      file_name: file.name,
      file_size: file.size,
      job_description: jobDescription,
      result_json: analysis,
      overall_score: analysis.overallScore,
    };

    const { error: insertError } = await supabase
      .from('analyses')
      .insert(analysisRecord);

    if (insertError) {
      console.error('Error saving analysis:', insertError);
      console.error('Verifique se a tabela analyses existe no Supabase.');
      // Não falhar a requisição se salvar falhar
    } else {
      console.log('Analysis saved successfully!');
    }

    // Incrementar contador se usuário free autenticado
    if (user) {
      const { data: userData } = await supabase
        .from('users')
        .select('subscription_tier, free_analyses_used')
        .eq('id', user.id)
        .single();

      if (userData && userData.subscription_tier === 'free') {
        await supabase
          .from('users')
          .update({ free_analyses_used: userData.free_analyses_used + 1 })
          .eq('id', user.id);
      }
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error in analyze API:', error);
    const message = error instanceof Error ? error.message : 'Erro interno do servidor.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}