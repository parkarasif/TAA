import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { FileUpload as FileUploadType } from '../types';

interface FileUploadProps {
  onFileUpload: (file: FileUploadType) => void;
  label: string;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  label, 
  accept = ".pdf,.doc,.docx,.txt" 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setUploadedFile(file.name);
      onFileUpload({
        name: file.name,
        content: content,
        type: file.type
      });
    };
    reader.readAsText(file);
  };

  const clearFile = () => {
    setUploadedFile(null);
    onFileUpload({ name: '', content: '', type: '' });
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {uploadedFile ? (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <File className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800">{uploadedFile}</span>
          </div>
          <button
            onClick={clearFile}
            className="p-1 hover:bg-green-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-green-600" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragOver
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onClick={() => document.getElementById(`file-${label}`)?.click()}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            Drag and drop your file here, or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Supports PDF, DOC, DOCX, TXT files
          </p>
          
          <input
            id={`file-${label}`}
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};