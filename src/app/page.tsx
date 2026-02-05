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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-16 md:mb-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">CV</span>
            </div>
            <span className="text-xl font-bold font-serif text-gray-900">CV Analyzer</span>
          </div>
          {/* <nav>
            <a href="#como-funciona" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Como funciona
            </a>
          </nav> */}
        </header>

        {result ? (
          /* Results View */
          <section className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AnalysisResult result={result} onNewAnalysis={handleNewAnalysis} />
          </section>
        ) : (
          /* Hero Section */
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Copy */}
            <div className="space-y-8 max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-serif font-bold leading-[1.1] tracking-tight text-gray-900">
                Destaque seu currículo nos <br />
                <span className="text-gray-500">processos seletivos</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                Descubra como recrutadores e sistemas ATS avaliam seu currículo.
                Receba sugestões práticas para aumentar suas chances.
              </p>

              {/* Steps Pills */}
              <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-700">
                <div className="px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
                  1. Envie
                </div>
                <span className="text-gray-300">›</span>
                <div className="px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
                  2. Analise
                </div>
                <span className="text-gray-300">›</span>
                <div className="px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
                  3. Melhore
                </div>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                  Otimização ATS com IA
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                  Análise em 5 dimensões
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                  Sugestões personalizadas
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                  Feedback instantâneo
                </div>
              </div>
            </div>

            {/* Right Column: Upload Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Análise Gratuita</h3>
                  <p className="text-gray-500 text-sm">Faça upload do seu CV para começar.</p>
                </div>

                <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />

                {/* Job Description Input */}
                <div className="mt-6 space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Descrição da vaga (opcional)
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Cole a descrição da vaga..."
                    className="w-full h-24 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 resize-none transition-all text-sm"
                    disabled={isLoading}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className={`mt-4 p-3 rounded-lg text-sm border ${limitReached
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                    : 'bg-red-50 border-red-200 text-red-600'
                    }`}>
                    {error}
                  </div>
                )}

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={!file || isLoading}
                  className={`
                    w-full mt-6 py-4 px-6 rounded-xl font-bold text-base
                    transition-all duration-300 flex items-center justify-center gap-2
                    ${file && !isLoading
                      ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {isLoading ? (
                    'Analisando...'
                  ) : (
                    <>
                      Analisar Currículo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  1 análise gratuita por usuário
                </p>
              </div>

              {/* Decorative elements behind card */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
