"use client";

import { type FileUploaderResult } from "@/hooks/use-file-uploader";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { UploadBox } from "@/components/upload-box";
import { OptionSelector } from "@/components/option-selector";
import { BorderRadiusSelector } from "@/components/border-radius-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { ImageRenderer } from "./image-renderer";
import { SaveAsPngButton } from "./save-as-png-button";

interface RoundedToolCoreProps {
  fileUploaderProps: FileUploaderResult;
}

export function RoundedToolCore({ fileUploaderProps }: RoundedToolCoreProps) {
  const { imageContent, imageMetadata, handleFileUploadEvent, cancel } =
    fileUploaderProps;
  const [radius, setRadius] = useLocalStorage<number>("roundedTool_radius", 8);
  const [customRadius, setCustomRadius] = useLocalStorage<number>(
    "roundedTool_customRadius",
    8,
  );
  const [selectedType, setSelectedType] = useLocalStorage<number | "custom">(
    "roundedTool_selectedType",
    8,
  );
  const [background, setBackground] = useLocalStorage<BackgroundOption>(
    "roundedTool_background",
    "transparent",
  );

  const handleRadiusChange = (value: number | "custom") => {
    setSelectedType(value);
    if (value === "custom") {
      setRadius(customRadius);
    } else {
      setRadius(value);
    }
  };

  const handleCustomRadiusChange = (value: number) => {
    setCustomRadius(value);
    if (selectedType === "custom") {
      setRadius(value);
    }
  };

  // Get the actual numeric radius value
  const effectiveRadius = radius;

  if (!imageMetadata) {
    return (
      <UploadBox
        title="Add rounded borders to your images. Quick and easy."
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
            <ImageRenderer
              imageContent={imageContent}
              radius={effectiveRadius}
              background={background}
              className="h-full w-full"
              alt="Rounded preview"
            />
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
          <span className="text-muted-foreground text-sm">Border Radius</span>
          <Badge variant="secondary" className="text-base font-medium">
            {effectiveRadius}px
          </Badge>
        </div>
      </div>

      {/* Border Radius Controls */}
      <BorderRadiusSelector
        title="Border Radius"
        options={[2, 4, 8, 16, 32, 64]}
        selected={selectedType}
        onChange={handleRadiusChange}
        customValue={customRadius}
        onCustomValueChange={handleCustomRadiusChange}
      />

      {/* Background Controls */}
      <OptionSelector
        title="Background"
        options={["white", "black", "transparent"]}
        selected={background}
        onChange={setBackground}
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
        <SaveAsPngButton
          imageContent={imageContent}
          radius={effectiveRadius}
          background={background}
          imageMetadata={imageMetadata}
        />
      </div>
    </div>
  );
}

type BackgroundOption = "white" | "black" | "transparent";
