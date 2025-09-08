"use client";

import { useEffect, useState } from "react";
import { type FileUploaderResult } from "@/hooks/use-file-uploader";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { UploadBox } from "@/components/upload-box";
import { OptionSelector } from "@/components/option-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { ImageRenderer } from "./image-renderer";
import { SaveAsImageButton } from "./save-as-image-button";

interface SquareToolCoreProps {
  fileUploaderProps: FileUploaderResult;
}

export function SquareToolCore({ fileUploaderProps }: SquareToolCoreProps) {
  const { imageContent, imageMetadata, handleFileUploadEvent, cancel } =
    fileUploaderProps;

  const [backgroundColor, setBackgroundColor] = useLocalStorage<
    "black" | "white"
  >("squareTool_backgroundColor", "white");

  const [squareImageContent, setSquareImageContent] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (imageContent && imageMetadata) {
      const canvas = document.createElement("canvas");
      const size = Math.max(imageMetadata.width, imageMetadata.height);
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fill background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, size, size);

      // Load and center the image
      const img = new Image();
      img.onload = () => {
        const x = (size - imageMetadata.width) / 2;
        const y = (size - imageMetadata.height) / 2;
        ctx.drawImage(img, x, y);
        setSquareImageContent(canvas.toDataURL("image/png"));
      };
      img.src = imageContent;
    }
  }, [imageContent, imageMetadata, backgroundColor]);

  if (!imageMetadata) {
    return (
      <UploadBox
        title="Create square images with custom backgrounds. Fast and free."
        description="Upload Image"
        accept="image/*"
        onChange={handleFileUploadEvent}
      />
    );
  }

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
            {squareImageContent && (
              <ImageRenderer
                imageContent={squareImageContent}
                className="h-full w-full"
                alt="Square preview"
              />
            )}
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
          <span className="text-muted-foreground text-sm">Square Size</span>
          <Badge variant="secondary" className="text-base font-medium">
            {Math.max(imageMetadata.width, imageMetadata.height)} ×{" "}
            {Math.max(imageMetadata.width, imageMetadata.height)}
          </Badge>
        </div>
      </div>

      {/* Background Color Controls */}
      <OptionSelector
        title="Background Color"
        options={["white", "black"]}
        selected={backgroundColor}
        onChange={setBackgroundColor}
        formatOption={(option) =>
          option.charAt(0).toUpperCase() + option.slice(1)
        }
      />

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={cancel} variant="outline" className="gap-2">
          <X className="h-4 w-4" />
          Cancel
        </Button>
        <SaveAsImageButton
          squareImageContent={squareImageContent}
          imageMetadata={imageMetadata}
        />
      </div>
    </div>
  );
}
