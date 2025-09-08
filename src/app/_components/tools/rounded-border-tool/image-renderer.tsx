"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ImageRendererProps {
  imageContent: string;
  radius: number;
  background: "white" | "black" | "transparent";
  className?: string;
  alt?: string;
}

export function ImageRenderer({
  imageContent,
  radius,
  background,
  className,
  alt = "Preview",
}: ImageRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const imgElement = containerRef.current.querySelector("img");
      if (imgElement) {
        imgElement.style.borderRadius = `${radius}px`;
      }
    }
  }, [imageContent, radius]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex w-full max-w-md items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor:
            background === "transparent" ? "transparent" : background,
          borderRadius: `${radius}px`,
        }}
      />
      <img
        src={imageContent}
        alt={alt}
        className="relative max-h-full max-w-full object-contain"
        style={{ borderRadius: `${radius}px` }}
      />
    </div>
  );
}
