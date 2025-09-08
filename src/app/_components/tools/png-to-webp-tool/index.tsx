"use client";

import { useFileUploader } from "@/hooks/use-file-uploader";
import { FileDropzone } from "@/components/file-dropzone";
import { PngToWebpCore } from "./png-to-webp-core";

export function PngToWebpTool() {
  const fileUploaderProps = useFileUploader();

  return (
    <FileDropzone
      setCurrentFile={fileUploaderProps.handleFileUpload}
      acceptedFileTypes={["image/png", ".png"]}
      dropText="Drop PNG file"
    >
      <PngToWebpCore fileUploaderProps={fileUploaderProps} />
    </FileDropzone>
  );
}
