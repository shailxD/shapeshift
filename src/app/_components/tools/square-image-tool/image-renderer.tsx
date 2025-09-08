"use client";

import { cn } from "@/lib/utils";

interface ImageRendererProps {
  imageContent: string;
  className?: string;
  alt?: string;
}

export function ImageRenderer({
  imageContent,
  className,
  alt = "Preview",
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
        alt={alt}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}
