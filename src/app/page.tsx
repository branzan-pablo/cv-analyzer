'use client';

import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import FileUpload from '@/components/FileUpload';
import AnalysisResult from '@/components/AnalysisResult';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import SocialProofBar from '@/components/landing/SocialProofBar';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';
import AuthModal from '@/components/auth/AuthModal';
import Paywall from '@/components/Paywall';
import { useAuth } from '@/hooks/useAuth';
import type { AnalysisResult as AnalysisResultType } from '@/types';

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResultType | null>(null);
  const [fingerprint, setFingerprint] = useState<string>('');
  const [limitReached, setLimitReached] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [requiresAuth, setRequiresAuth] = useState(false);

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };
    loadFingerprint();
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Por favor, selecione um arquivo.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fingerprint', fingerprint);
      if (jobDescription.trim()) {
        formData.append('jobDescription', jobDescription);
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.limitReached) {
          setLimitReached(true);
          setRequiresAuth(data.requiresAuth || false);
          setShowPaywall(true);
        }
        throw new Error(data.error || 'Erro ao analisar o currículo.');
      }

      setResult(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setFile(null);
    setJobDescription('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <Header />

        {result ? (
          /* Results View */
          <section className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AnalysisResult result={result} onNewAnalysis={handleNewAnalysis} />
          </section>
        ) : (
          /* Hero Section */
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Copy */}
            <div className="space-y-8 max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-gray-900">
                Destaque seu currículo nos{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  processos seletivos
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">
                Descubra como recrutadores e sistemas ATS avaliam seu currículo.
                Receba sugestões práticas baseadas em IA para aumentar suas chances.
              </p>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-3 text-gray-600 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mt-2 flex-shrink-0"></div>
                  <span>Otimização ATS com IA</span>
                </div>
                <div className="flex items-start gap-3 text-gray-600 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mt-2 flex-shrink-0"></div>
                  <span>Análise em 5 dimensões</span>
                </div>
                <div className="flex items-start gap-3 text-gray-600 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mt-2 flex-shrink-0"></div>
                  <span>Sugestões personalizadas</span>
                </div>
                <div className="flex items-start gap-3 text-gray-600 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mt-2 flex-shrink-0"></div>
                  <span>Feedback instantâneo</span>
                </div>
              </div>
            </div>

            {/* Right Column: Upload Card */}
            <div className="relative">
              <div className="bg-gray-100 rounded-3xl p-8 shadow-2xl shadow-black/10 border border-gray-200/50 backdrop-blur-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Análise Gratuita</h3>
                  <p className="text-gray-500 text-sm">Faça upload do seu CV para começar.</p>
                </div>

                <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />

                {/* Job Description Input */}
                <div className="mt-6 space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Descrição da vaga (opcional)
                  </label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Cole a descrição da vaga para uma análise personalizada..."
                    className="h-28"
                    disabled={isLoading}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className={`mt-4 p-4 rounded-2xl text-sm border ${limitReached
                    ? 'bg-yellow-900 border-yellow-500 text-yellow-300'
                    : 'bg-red-900 border-red-500 text-red-300'
                    }`}>
                    {error}
                  </div>
                )}

                {/* Analyze Button */}
                <Button
                  onClick={handleAnalyze}
                  disabled={!file || isLoading}
                  className="w-full mt-6"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analisando...
                    </div>
                  ) : (
                    'Analisar Currículo'
                  )}
                </Button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  1 análise gratuita por usuário
                </p>
              </div>

              {/* Decorative elements behind card */}
              <div className="absolute -top-12 -right-12 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl -z-10 animate-blob"></div>
              <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full filter blur-3xl -z-10 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        )}

        {/* Landing Page Sections */}
        {!result && (
          <>
            <SocialProofBar />
            <HowItWorks />
            <Features />
            <Pricing />
            <FAQ />
          </>
        )}
      </main>
      
      <Footer />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          setShowPaywall(false);
        }}
      />
      
      <Paywall
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        requiresAuth={requiresAuth}
        onShowAuth={() => {
          setShowPaywall(false);
          setShowAuthModal(true);
        }}
      />
    </div>
  );
}
