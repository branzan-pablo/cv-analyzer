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
        relative overflow-hidden rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer
        transition-all duration-300 ease-out
        ${isDragActive
                    ? 'border-purple-400 bg-purple-50 scale-[1.02]'
                    : selectedFile 
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-300 bg-gray-50 hover:border-purple-300 hover:bg-purple-50/30'
                }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
        >
            <input {...getInputProps()} />

            <div className="relative z-10">
                {selectedFile ? (
                    <div className="space-y-3">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center mb-4">
                            <span className="text-3xl font-bold text-white">✓</span>
                        </div>
                        <p className="text-base font-bold text-gray-900">
                            {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-600">
                            {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                        <p className="text-sm text-purple-500 font-medium mt-3">
                            Clique para trocar o arquivo
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className={`w-16 h-16 mx-auto rounded-2xl ${isDragActive ? 'bg-gradient-to-br from-purple-400 to-pink-400' : 'bg-gradient-to-br from-gray-300 to-gray-400'} flex items-center justify-center mb-4 transition-all duration-300`}>
                            <span className="text-3xl font-bold text-white">↑</span>
                        </div>
                        <p className="text-base font-bold text-gray-900">
                            {isDragActive ? 'Solte o arquivo aqui' : 'Arraste seu arquivo'}
                        </p>
                        <p className="text-sm text-gray-500">
                            ou clique para selecionar
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                            PDF, DOCX ou TXT • Até 5MB
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
