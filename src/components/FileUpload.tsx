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
        relative overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer
        transition-all duration-300 ease-out
        ${isDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
        >
            <input {...getInputProps()} />

            <div className="relative z-10">
                {/* Icon */}
                <div className={`mx-auto w-12 h-12 mb-4 rounded-full flex items-center justify-center transition-colors ${selectedFile ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                    {selectedFile ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    )}
                </div>

                {selectedFile ? (
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">
                            {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                        <p className="text-xs text-blue-500 mt-2">
                            Clique para trocar
                        </p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">
                            {isDragActive ? 'Solte o arquivo aqui' : 'Arraste seu PDF, DOCX ou TXT'}
                        </p>
                        <p className="text-xs text-gray-500">
                            ou clique para selecionar
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
