import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BrainCircuit, RotateCcw } from "lucide-react";

interface ImagePreviewProps {
  imageUrl: string | null;
  onAnalyze: () => void;
  onReset: () => void;
}

export function ImagePreview({
  imageUrl,
  onAnalyze,
  onReset,
}: ImagePreviewProps) {
  if (!imageUrl) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Image Preview</h2>
        <p className="text-sm text-slate-400 dark:text-slate-400">
          Verify that your MRI scan is clear and properly oriented before
          analysis
        </p>
      </div>

      <div className="flex justify-center">
        <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 max-w-md w-full">
          <div className="aspect-square relative bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="MRI scan preview"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="outline"
          onClick={onReset}
          className="flex-1 sm:flex-initial"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Upload Different Image
        </Button>
        <Button onClick={onAnalyze} className="flex-1 sm:flex-initial">
          <BrainCircuit className="mr-2 h-4 w-4" />
          Analyze Image
        </Button>
      </div>
    </div>
  );
}
