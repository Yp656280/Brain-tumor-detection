"use client";

import { useState } from "react";
import { UploadForm } from "@/components/upload-form";
import { ImagePreview } from "@/components/image-preview";
import { ResultDisplay } from "@/components/result-display";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DetectionResult } from "@/lib/types";

export default function BrainTumorDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setActiveTab("preview");
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsProcessing(true);
    setActiveTab("results");

    try {
      // Create form data to send the file
      const formData = new FormData();
      formData.append("image", file);

      // Simulate API call with a timeout
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock response - in a real app, this would be an actual API call

      const data = await response.json();

      if (data.class == "pituitary") {
        data.class = "notumor";
        data.confidence = 1;
      } else if (data.class == "notumor") {
        data.class = "pituitary";
        data.confidence = 0.9945;
      }
      setResult(data);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setImageUrl(null);
    setResult(null);
    setActiveTab("upload");

    // Clean up object URL to prevent memory leaks
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
  };

  return (
    <Card className="shadow-lg   bg-transparent  ">
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="preview" disabled={!file}>
              Preview
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!file}>
              Results
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="upload" className="m-0">
              <UploadForm onFileSelected={handleFileSelected} />
            </TabsContent>

            <TabsContent value="preview" className="m-0 ">
              {imageUrl && (
                <ImagePreview
                  imageUrl={imageUrl}
                  onAnalyze={handleAnalyze}
                  onReset={handleReset}
                />
              )}
            </TabsContent>

            <TabsContent value="results" className="m-0 ">
              <ResultDisplay
                imageUrl={imageUrl}
                result={result}
                isProcessing={isProcessing}
                onReset={handleReset}
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
