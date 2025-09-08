"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { FileUploaderResult } from "@/hooks/use-file-uploader";
import { UploadBox } from "@/components/upload-box";
import { ImageRenderer } from "./image-renderer";
import { SaveAsWebpButton } from "./save-as-webp-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptionSelector } from "@/components/option-selector";
import { X } from "lucide-react";

interface PngToWebpCoreProps {
  fileUploaderProps: FileUploaderResult;
}

export function PngToWebpCore({ fileUploaderProps }: PngToWebpCoreProps) {
  const { imageContent, imageMetadata, handleFileUploadEvent, cancel } =
    fileUploaderProps;

  const [quality, setQuality] = useLocalStorage<number>(
    "pngToWebp_quality",
    80,
  );

  if (!imageMetadata || !imageContent)
    return (
      <UploadBox
        title="Convert PNG files to WebP format with better compression."
        description="Upload PNG"
        accept=".png,image/png"
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
            <ImageRenderer
              imageContent={imageContent}
              imageMetadata={imageMetadata}
              className="h-full w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Size Information */}
      <div className="flex gap-4 text-base">
        <div className="flex flex-col items-center gap-2">
          <span className="text-muted-foreground text-sm">Size</span>
          <Badge variant="outline" className="text-base font-medium">
            {imageMetadata.width} × {imageMetadata.height}
          </Badge>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-muted-foreground text-sm">Format</span>
          <Badge variant="secondary" className="text-base font-medium">
            PNG → WebP
          </Badge>
        </div>
      </div>

      {/* Quality Controls */}
      <OptionSelector
        title="Quality"
        options={[60, 70, 80, 90, 95]}
        selected={quality}
        onChange={setQuality}
        formatOption={(option) => `${option}%`}
      />

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={cancel} variant="outline" className="gap-2">
          <X className="h-4 w-4" />
          Cancel
        </Button>
        <SaveAsWebpButton
          imageContent={imageContent}
          quality={quality}
          imageMetadata={imageMetadata}
        />
      </div>
    </div>
  );
}
