"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSvgConverter } from "@/hooks/use-svg-converter";
import type { ImageMetadata } from "@/types/svg-tool";
import { Download } from "lucide-react";

interface SaveAsPngButtonProps {
  svgContent: string;
  scale: number;
  imageMetadata: ImageMetadata;
}

export function SaveAsPngButton({
  svgContent,
  scale,
  imageMetadata,
}: SaveAsPngButtonProps) {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const { convertToPng, canvasProps } = useSvgConverter({
    canvas: canvasRef,
    svgContent,
    scale,
    imageMetadata,
  });

  return (
    <div>
      <canvas ref={setCanvasRef} {...canvasProps} hidden />
      <Button
        onClick={() => {
          void convertToPng();
        }}
        variant="submit"
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Save as PNG
      </Button>
    </div>
  );
}
