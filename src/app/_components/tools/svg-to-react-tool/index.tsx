"use client";

import { useFileUploader } from "@/hooks/use-file-uploader";
import { FileDropzone } from "@/components/file-dropzone";
import { SvgToReactCore } from "./svg-to-react-core";

export function SvgToReactTool() {
  const fileUploaderProps = useFileUploader();

  return (
    <FileDropzone
      setCurrentFile={fileUploaderProps.handleFileUpload}
      acceptedFileTypes={["image/svg+xml", ".svg"]}
      dropText="Drop SVG file"
    >
      <SvgToReactCore fileUploaderProps={fileUploaderProps} />
    </FileDropzone>
  );
}
