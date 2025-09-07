"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SVGRendererProps {
  svgContent: string;
  className?: string;
}

export function SVGRenderer({ svgContent, className }: SVGRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = svgContent;
      const svgElement = containerRef.current.querySelector("svg");
      if (svgElement) {
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute("height", "100%");
        svgElement.style.maxWidth = "100%";
        svgElement.style.maxHeight = "100%";
        svgElement.style.objectFit = "contain";
      }
    }
  }, [svgContent]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center justify-center overflow-hidden",
        className,
      )}
    />
  );
}
