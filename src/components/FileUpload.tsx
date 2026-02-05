'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    isLoading?: boolean;
}

export default function FileUpload({ onFileSelect, isLoading }: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                setSelectedFile(file);
                onFileSelect(file);
            }
        },
        [onFileSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/msword': ['.doc'],
            'text/plain': ['.txt'],
        },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024, // 5MB
        disabled: isLoading,
    });

    return (
        <div
            {...getRootProps()}
            className={`
        relative overflow-hidden rounded-2xl border-2 border-dashed p-8 md:p-12 text-center cursor-pointer
        transition-all duration-300 ease-out
        ${isDragActive
                    ? 'border-purple-500 bg-purple-500/10 scale-[1.02]'
                    : 'border-white/20 bg-white/5 hover:border-purple-400/50 hover:bg-white/10'
                }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
        >
            <input {...getInputProps()} />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 pointer-events-none" />

            <div className="relative z-10">
                {/* Icon */}
                <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                </div>

                {selectedFile ? (
                    <div className="space-y-2">
                        <p className="text-lg font-medium text-white">
                            {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-400">
                            {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                        <p className="text-sm text-purple-400">
                            Clique ou arraste para trocar
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p className="text-lg font-medium text-white">
                            {isDragActive ? 'Solte o arquivo aqui' : 'Arraste seu currículo ou clique para selecionar'}
                        </p>
                        <p className="text-sm text-gray-400">
                            PDF, DOCX ou TXT • Máximo 5MB
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
