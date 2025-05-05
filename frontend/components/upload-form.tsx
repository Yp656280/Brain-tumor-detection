"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Upload, FileImage, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UploadFormProps {
  onFileSelected: (file: File) => void;
}

export function UploadForm({ onFileSelected }: UploadFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/tiff",
    ];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, GIF, BMP, TIFF)");
      return false;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File size exceeds 10MB limit");
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelected(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelected(file);
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-slate-300 dark:border-slate-700 hover:border-primary/50"
        } transition-colors duration-200 cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-medium">Drag and drop your MRI scan</p>
            <p className="text-sm text-slate-400 dark:text-slate-400 mt-1">
              or click to browse files
            </p>
          </div>
          <div className="flex items-center text-xs text-slate-400 dark:text-slate-400">
            <FileImage className="mr-1 h-4 w-4" />
            <span>Supported formats: JPEG, PNG, GIF, BMP, TIFF</span>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload MRI scan"
      />
    </div>
  );
}
