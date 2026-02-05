'use client';

import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import FileUpload from '@/components/FileUpload';
import AnalysisResult from '@/components/AnalysisResult';
import type { AnalysisResult as AnalysisResultType } from '@/types';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResultType | null>(null);
  const [fingerprint, setFingerprint] = useState<string>('');
  const [limitReached, setLimitReached] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CV</span>
              </div>
              <span className="text-xl font-bold text-white">CV Analyzer</span>
            </div>
            <a
              href="#como-funciona"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Como funciona
            </a>
          </div>
        </header>

        {result ? (
          /* Results View */
          <section className="max-w-4xl mx-auto px-4 py-12">
            <AnalysisResult result={result} onNewAnalysis={handleNewAnalysis} />
          </section>
        ) : (
          <>
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                Powered by Google Gemini AI
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Destaque seu currículo nos{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  processos seletivos
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                Descubra como recrutadores e sistemas ATS avaliam seu currículo.
                Receba sugestões práticas para aumentar suas chances de entrevista.
              </p>
            </section>

            {/* Upload Section */}
            <section className="max-w-2xl mx-auto px-4 pb-8">
              <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />

              {/* Job Description Input */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Descrição da vaga (opcional)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Cole aqui a descrição da vaga para uma análise mais direcionada..."
                  className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 resize-none transition-all"
                  disabled={isLoading}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Com a descrição da vaga, suas sugestões serão direcionadas aos requisitos específicos da posição.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className={`mt-4 p-4 rounded-xl border ${limitReached
                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}>
                  <p>{error}</p>
                  {limitReached && (
                    <p className="mt-2 text-sm">
                      Entre em contato para adquirir mais análises.
                    </p>
                  )}
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!file || isLoading}
                className={`
                  w-full mt-6 py-4 px-6 rounded-xl font-semibold text-lg
                  transition-all duration-300 flex items-center justify-center gap-3
                  ${file && !isLoading
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analisando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Analisar Currículo
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                🎁 1 análise gratuita por usuário
              </p>
            </section>

            {/* How it works */}
            <section id="como-funciona" className="max-w-4xl mx-auto px-4 py-16">
              <h2 className="text-2xl font-bold text-white text-center mb-12">Como funciona</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    title: 'Envie seu currículo',
                    description: 'Faça upload do seu CV em PDF, DOCX ou TXT.',
                    icon: '📄',
                  },
                  {
                    step: '2',
                    title: 'IA analisa',
                    description: 'Nossa IA avalia seu currículo em 5 dimensões.',
                    icon: '🤖',
                  },
                  {
                    step: '3',
                    title: 'Receba feedback',
                    description: 'Veja sua pontuação e sugestões de melhoria.',
                    icon: '✨',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all"
                  >
                    <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="text-4xl mb-4 mt-2">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Footer */}
        <footer className="border-t border-white/10 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} CV Analyzer. Powered by Google Gemini AI.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
