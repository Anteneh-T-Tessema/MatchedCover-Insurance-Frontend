'use client';

import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Image, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Trash2,
  Cloud,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  url?: string;
  preview?: string;
  extractedText?: string;
  metadata?: {
    documentType?: string;
    confidence?: number;
    language?: string;
    pages?: number;
  };
}

interface ProcessingResult {
  success: boolean;
  documentType: string;
  extractedData: Record<string, unknown>;
  confidence: number;
  language: string;
}

export default function UniversalDocumentProcessor() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Universal file processing (works globally)
  const processFile = async (_file: File): Promise<ProcessingResult> => {
    // Simulate universal document processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const documentTypes = ['Driver License', 'Passport', 'Insurance Document', 'Vehicle Registration', 'Utility Bill'];
    const languages = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'hi', 'ru'];
    
    return {
      success: Math.random() > 0.1, // 90% success rate
      documentType: documentTypes[Math.floor(Math.random() * documentTypes.length)],
      extractedData: {
        name: 'John Doe',
        documentNumber: 'DOC123456789',
        expiryDate: '2025-12-31',
        issueDate: '2020-01-01'
      },
      confidence: 85 + Math.random() * 15,
      language: languages[Math.floor(Math.random() * languages.length)]
    };
  };

  const handleFileUpload = useCallback(async (uploadFiles: FileList | File[]) => {
    const fileArray = Array.from(uploadFiles);
    
    for (const file of fileArray) {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0
      };

      setFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setFiles(prev => prev.map(f => 
          f.id === newFile.id 
            ? { ...f, progress: Math.min(f.progress + 10, 100) }
            : f
        ));
      }, 200);

      setTimeout(async () => {
        clearInterval(uploadInterval);
        
        setFiles(prev => prev.map(f => 
          f.id === newFile.id 
            ? { ...f, status: 'processing', progress: 100 }
            : f
        ));

        try {
          // Create preview URL for images
          let preview: string | undefined;
          if (file.type.startsWith('image/')) {
            preview = URL.createObjectURL(file);
          }

          const result = await processFile(file);
          
          setFiles(prev => prev.map(f => 
            f.id === newFile.id 
              ? { 
                  ...f, 
                  status: result.success ? 'completed' : 'error',
                  preview,
                  url: preview || 'processed',
                  metadata: {
                    documentType: result.documentType,
                    confidence: result.confidence,
                    language: result.language,
                    pages: 1
                  },
                  extractedText: result.success ? JSON.stringify(result.extractedData, null, 2) : undefined
                }
              : f
          ));
        } catch (error) {
          console.error('Processing error:', error);
          setFiles(prev => prev.map(f => 
            f.id === newFile.id 
              ? { ...f, status: 'error' }
              : f
          ));
        }
      }, 2000);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    return FileText;
  };

  const getStatusColor = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'processing': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center space-x-3">
          <Cloud className="h-8 w-8 text-purple-600" />
          <span>Universal Document Processor</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          AI-powered document processing that works globally across all document types and languages
        </p>
        
        {/* Global Features */}
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-green-500" />
            <span>200+ Languages</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <span>Bank-Level Security</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>Instant Processing</span>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging 
            ? 'border-purple-400 bg-purple-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className="h-12 w-12 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Upload Documents</h3>
            <p className="text-gray-600">
              Drag and drop files here, or{' '}
              <button
                className="text-purple-600 hover:text-purple-700 underline"
                onClick={() => fileInputRef.current?.click()}
              >
                browse
              </button>
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Supports: Images (JPG, PNG, PDF), Documents (PDF, DOC), Max 10MB per file
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          className="hidden"
          aria-label="Upload documents"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Uploaded Files</h3>
          <div className="space-y-3">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type);
              
              return (
                <div
                  key={file.id}
                  className={`p-4 rounded-lg border-2 transition-colors ${getStatusColor(file.status)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileIcon className="h-6 w-6" />
                      <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm opacity-75">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {file.status === 'uploading' && (
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                      
                      {file.status === 'processing' && (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin h-4 w-4 border-2 border-yellow-600 border-t-transparent rounded-full" />
                          <span className="text-sm">Processing...</span>
                        </div>
                      )}
                      
                      {file.status === 'completed' && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-sm">Complete</span>
                        </div>
                      )}
                      
                      {file.status === 'error' && (
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                          <span className="text-sm">Error</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        {file.preview && (
                          <button
                            className="p-1 hover:bg-white/50 rounded"
                            title="Preview"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        
                        {file.url && file.status === 'completed' && (
                          <button
                            className="p-1 hover:bg-white/50 rounded"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 hover:bg-white/50 rounded"
                          title="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Metadata for completed files */}
                  {file.status === 'completed' && file.metadata && (
                    <div className="mt-3 pt-3 border-t border-current/20">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="opacity-75">Document Type:</span>
                          <div className="font-medium">{file.metadata.documentType}</div>
                        </div>
                        <div>
                          <span className="opacity-75">Confidence:</span>
                          <div className="font-medium">{file.metadata.confidence?.toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="opacity-75">Language:</span>
                          <div className="font-medium uppercase">{file.metadata.language}</div>
                        </div>
                        <div>
                          <span className="opacity-75">Pages:</span>
                          <div className="font-medium">{file.metadata.pages}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Processing Capabilities */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Universal Processing Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Document Types</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Driver Licenses (Global)</li>
              <li>• Passports (All Countries)</li>
              <li>• Insurance Documents</li>
              <li>• Vehicle Registration</li>
              <li>• Utility Bills</li>
              <li>• Bank Statements</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Languages Supported</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• English, Spanish, French</li>
              <li>• German, Portuguese, Italian</li>
              <li>• Chinese, Japanese, Korean</li>
              <li>• Arabic, Hindi, Russian</li>
              <li>• 190+ Additional Languages</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Security Features</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• End-to-end encryption</li>
              <li>• SOC 2 Type II compliance</li>
              <li>• GDPR/CCPA compliant</li>
              <li>• Zero data retention</li>
              <li>• Audit trail logging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
