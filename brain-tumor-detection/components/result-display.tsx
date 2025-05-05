import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Clock,
  Percent,
  BrainCircuit,
} from "lucide-react";
import type { DetectionResult } from "@/lib/types";

interface ResultDisplayProps {
  imageUrl: string | null;
  result: DetectionResult | null;
  isProcessing: boolean;
  onReset: () => void;
}

export function ResultDisplay({
  imageUrl,
  result,
  isProcessing,
  onReset,
}: ResultDisplayProps) {
  if (!imageUrl) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          {isProcessing ? "Analyzing Image..." : "Analysis Results"}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {isProcessing
            ? "Our AI model is processing your MRI scan"
            : result
            ? "Review the detection results below"
            : "Something went wrong during analysis"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="aspect-square relative bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Analyzed MRI scan"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </Card>

        <div className="flex flex-col justify-center">
          {isProcessing ? (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center">
                <div className="animate-pulse">
                  <BrainCircuit className="h-16 w-16 text-primary" />
                </div>
              </div>
              <Progress value={45} className="w-full" />
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Processing image with our neural network...
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div
                className={`p-4 rounded-lg ${
                  result.class != "notumor"
                    ? "bg-red-50 dark:bg-red-950/30 "
                    : "bg-green-50 dark:bg-green-950/30"
                }`}
              >
                <div className="flex items-center ">
                  {result.class != "notumor" ? (
                    <AlertTriangle className="h-8 w-8 text-red-500 mr-3 " />
                  ) : (
                    <CheckCircle2 className="h-8 w-8 text-green-500 mr-3" />
                  )}
                  <div>
                    <h3 className="font-bold text-lg ">
                      {result.class != "notumor" ? (
                        <span className=" text-red-500">Tumor Detected</span>
                      ) : (
                        <span className="text-green-500 ">
                          No Tumor Detected
                        </span>
                      )}
                    </h3>
                    <p
                      className={`text-sm ${
                        result.class != "notumor"
                          ? "text-red-500 dark:text-red-400"
                          : "text-green-500 dark:text-green-400"
                      }`}
                    >
                      {result.class != "notumor"
                        ? "The scan shows indicators of a brain tumor"
                        : "The scan appears normal with notumor indicators"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-slate-400 dark:text-slate-300">
                    <span>Confidence Level </span>
                    <Percent className="h-4 w-4 mr-2" />
                  </div>
                  <span className="font-medium">
                    {result.confidence * 100}%
                  </span>
                </div>
                <Separator />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-slate-400 dark:text-slate-300">
                    <span> Brain Tumor</span>
                  </div>
                  <span className="font-medium">{result.class}</span>
                </div>
                <Separator />
              </div>

              <div className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                <p className="italic">
                  Note: This is a demonstration application of a neural network.
                  In a real medical context, results should always be verified
                  by qualified healthcare professionals.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center p-4">
              <p className="text-red-500 dark:text-red-400">
                An error occurred during analysis. Please try again.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Upload New Image
        </Button>
      </div>
    </div>
  );
}
