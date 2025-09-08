"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { ImageMetadata } from "@/types/svg-tool";
import { Download } from "lucide-react";

interface SaveAsPngButtonProps {
  imageContent: string;
  radius: number;
  background: "white" | "black" | "transparent";
  imageMetadata: ImageMetadata;
}

export function SaveAsPngButton({
  imageContent,
  radius,
  background,
  imageMetadata,
}: SaveAsPngButtonProps) {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  const { width, height } = useMemo(() => {
    return {
      width: imageMetadata.width,
      height: imageMetadata.height,
    };
  }, [imageMetadata]);

  const convertToPng = async () => {
    const ctx = canvasRef?.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    const saveImage = () => {
      if (canvasRef) {
        const dataURL = canvasRef.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        const imageFileName = imageMetadata.name ?? "image_converted";
        link.download = `${imageFileName.replace(/\..+$/, "")}-rounded.png`;
        link.click();
      }
    };

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, width, height);

      // Set background if not transparent
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }

      // Create rounded clipping path
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(width - radius, 0);
      ctx.quadraticCurveTo(width, 0, width, radius);
      ctx.lineTo(width, height - radius);
      ctx.quadraticCurveTo(width, height, width - radius, height);
      ctx.lineTo(radius, height);
      ctx.quadraticCurveTo(0, height, 0, height - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.clip();

      // Draw the image
      ctx.drawImage(img, 0, 0, width, height);
      saveImage();
    };

    img.src = imageContent;
  };

  return (
    <div>
      <canvas ref={setCanvasRef} width={width} height={height} hidden />
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
