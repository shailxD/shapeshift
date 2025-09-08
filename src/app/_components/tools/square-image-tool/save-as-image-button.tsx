"use client";

import { Button } from "@/components/ui/button";
import type { ImageMetadata } from "@/types/svg-tool";
import { Download } from "lucide-react";

interface SaveAsImageButtonProps {
  squareImageContent: string | null;
  imageMetadata: ImageMetadata;
}

export function SaveAsImageButton({
  squareImageContent,
  imageMetadata,
}: SaveAsImageButtonProps) {
  const handleSaveImage = () => {
    if (squareImageContent && imageMetadata) {
      const link = document.createElement("a");
      link.href = squareImageContent;
      const originalFileName = imageMetadata.name;
      const fileNameWithoutExtension =
        originalFileName.substring(0, originalFileName.lastIndexOf(".")) ||
        originalFileName;
      link.download = `${fileNameWithoutExtension}-squared.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Button
      onClick={handleSaveImage}
      variant="submit"
      className="gap-2"
      disabled={!squareImageContent}
    >
      <Download className="h-4 w-4" />
      Save as PNG
    </Button>
  );
}
