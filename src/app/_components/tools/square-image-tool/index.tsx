"use client";

import { useFileUploader } from "@/hooks/use-file-uploader";
import { FileDropzone } from "@/components/file-dropzone";
import { SquareToolCore } from "./square-tool-core";

export function SquareTool() {
  const fileUploaderProps = useFileUploader();

  return (
    <FileDropzone
      setCurrentFile={fileUploaderProps.handleFileUpload}
      acceptedFileTypes={["image/*", ".jpg", ".jpeg", ".png", ".webp", ".svg"]}
      dropText="Drop image file"
    >
      <SquareToolCore fileUploaderProps={fileUploaderProps} />
    </FileDropzone>
  );
}
