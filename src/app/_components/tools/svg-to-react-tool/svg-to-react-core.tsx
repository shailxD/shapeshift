"use client";

import { useState, useEffect } from "react";
import { type FileUploaderResult } from "@/hooks/use-file-uploader";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { UploadBox } from "@/components/upload-box";
import { OptionSelector } from "@/components/option-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CodePreview } from "./code-preview";
import { SvgRenderer } from "./svg-renderer";
import { generateReactComponent, type SvgToReactOptions } from "./utils";

interface SvgToReactCoreProps {
  fileUploaderProps: FileUploaderResult;
}

export function SvgToReactCore({ fileUploaderProps }: SvgToReactCoreProps) {
  const { rawContent, imageMetadata, handleFileUploadEvent, cancel } =
    fileUploaderProps;

  // Options state
  const [outputType, setOutputType] = useLocalStorage<"jsx" | "tsx">(
    "svgToReact_outputType",
    "tsx",
  );

  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [warnings, setWarnings] = useState<string[]>([]);

  // Generate React component whenever options or SVG content changes
  useEffect(() => {
    if (rawContent && imageMetadata?.name) {
      const options: SvgToReactOptions = {
        outputType,
      };

      try {
        const result = generateReactComponent(
          rawContent,
          imageMetadata.name,
          options,
        );
        setGeneratedCode(result.code);
        setWarnings(result.warnings);
      } catch (error) {
        console.error("Failed to generate React component:", error);
        setWarnings([
          "Failed to generate React component. Please check your SVG file.",
        ]);
      }
    }
  }, [rawContent, imageMetadata?.name, outputType]);

  if (!imageMetadata || !rawContent) {
    return (
      <UploadBox
        title="Convert SVG files to React components with TypeScript support."
        description="Upload SVG"
        accept="image/svg+xml,.svg"
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
            <SvgRenderer svgContent={rawContent} className="h-full w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="w-full space-y-2">
          {warnings.map((warning, index) => (
            <Alert key={index} variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{warning}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Output Type Controls */}
      <OptionSelector
        title="Output Type"
        options={["jsx", "tsx"] as const}
        selected={outputType}
        onChange={setOutputType}
        formatOption={(option) => option.toUpperCase()}
      />

      {/* Generated Code */}
      {generatedCode && (
        <CodePreview
          code={generatedCode}
          language={outputType}
          fileName={imageMetadata.name.replace(/\.svg$/, "")}
          className="w-full"
        />
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={cancel} variant="outline" className="gap-2">
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
