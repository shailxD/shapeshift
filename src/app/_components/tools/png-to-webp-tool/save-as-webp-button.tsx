"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ImageMetadata } from "@/types/svg-tool";
import { Download } from "lucide-react";

interface SaveAsWebpButtonProps {
  imageContent: string;
  quality: number;
  imageMetadata: ImageMetadata;
}

export function SaveAsWebpButton({
  imageContent,
  quality,
  imageMetadata,
}: SaveAsWebpButtonProps) {
  const [isConverting, setIsConverting] = useState(false);

  const convertToWebp = async () => {
    setIsConverting(true);

    try {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Create an image element and load the PNG
      const img = new Image();

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageContent;
      });

      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on canvas
      ctx.drawImage(img, 0, 0);

      // Convert to WebP
      const webpDataUrl = canvas.toDataURL("image/webp", quality / 100);

      // Create download link
      const link = document.createElement("a");
      link.download = imageMetadata.name.replace(/\.png$/i, ".webp");
      link.href = webpDataUrl;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error converting to WebP:", error);
      alert("Failed to convert image. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Button onClick={convertToWebp} disabled={isConverting} className="gap-2">
      <Download className="h-4 w-4" />
      {isConverting ? "Converting..." : "Download WebP"}
    </Button>
  );
}
