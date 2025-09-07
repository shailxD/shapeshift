"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { FileUploaderResult } from "@/hooks/use-file-uploader";
import { UploadBox } from "@/components/upload-box";
import { SVGScaleSelector } from "@/components/svg-scale-selector";
import { SVGRenderer } from "./svg-renderer";
import { SaveAsPngButton } from "./save-as-png-button";
import type { Scale } from "@/types/svg-tool";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

interface SVGToolCoreProps {
  fileUploaderProps: FileUploaderResult;
}

export function SVGToolCore({ fileUploaderProps }: SVGToolCoreProps) {
  const { rawContent, imageMetadata, handleFileUploadEvent, cancel } =
    fileUploaderProps;

  const [scale, setScale] = useLocalStorage<Scale>("svgTool_scale", 1);
  const [customScale, setCustomScale] = useLocalStorage<number>(
    "svgTool_customScale",
    1,
  );

  // Get the actual numeric scale value
  const effectiveScale = scale === "custom" ? customScale : scale;

  if (!imageMetadata)
    return (
      <UploadBox
        title="Convert SVGs to PNGs – and upscale them too."
        description="Upload SVG"
        accept=".svg"
        onChange={handleFileUploadEvent}
      />
    );

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 p-6">
      {/* Preview Section */}
      <Card className="max-w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-medium">
            {imageMetadata.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-lg border">
            <SVGRenderer svgContent={rawContent} className="h-full w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Size Information */}
      <div className="flex gap-4 text-base">
        <div className="flex flex-col items-center gap-2">
          <span className="text-muted-foreground text-sm">Original Size</span>
          <Badge variant="outline" className="text-base font-medium">
            {imageMetadata.width} × {imageMetadata.height}
          </Badge>
        </div>

        <Separator orientation="vertical" className="h-12" />

        <div className="flex flex-col items-center gap-2">
          <span className="text-muted-foreground text-sm">Scaled Size</span>
          <Badge variant="secondary" className="text-base font-medium">
            {imageMetadata.width * effectiveScale} ×{" "}
            {imageMetadata.height * effectiveScale}
          </Badge>
        </div>
      </div>

      {/* Scale Controls */}
      <SVGScaleSelector
        title="Scale Factor"
        options={[1, 2, 4, 8, 16, 32, 64]}
        selected={scale}
        onChange={setScale}
        customValue={customScale}
        onCustomValueChange={setCustomScale}
      />

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={cancel} variant="outline" className="gap-2">
          <X className="h-4 w-4" />
          Cancel
        </Button>
        <SaveAsPngButton
          svgContent={rawContent}
          scale={effectiveScale}
          imageMetadata={imageMetadata}
        />
      </div>
    </div>
  );
}
