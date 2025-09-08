"use client";

import { cn } from "@/lib/utils";
import type { ImageMetadata } from "@/types/svg-tool";

interface ImageRendererProps {
  imageContent: string;
  imageMetadata: ImageMetadata;
  className?: string;
}

export function ImageRenderer({
  imageContent,
  imageMetadata,
  className,
}: ImageRendererProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <img
        src={imageContent}
        alt={imageMetadata.name}
        className="max-h-full max-w-full object-contain"
        style={{
          width: "auto",
          height: "auto",
        }}
      />
    </div>
  );
}
