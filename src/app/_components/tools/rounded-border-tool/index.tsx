"use client";

import { useFileUploader } from "@/hooks/use-file-uploader";
import { FileDropzone } from "@/components/file-dropzone";
import { RoundedToolCore } from "./rounded-tool-core";

export function RoundedTool() {
  const fileUploaderProps = useFileUploader();

  return (
    <FileDropzone
      setCurrentFile={fileUploaderProps.handleFileUpload}
      acceptedFileTypes={["image/*", ".jpg", ".jpeg", ".png", ".webp", ".svg"]}
      dropText="Drop image file"
    >
      <RoundedToolCore fileUploaderProps={fileUploaderProps} />
    </FileDropzone>
  );
}
