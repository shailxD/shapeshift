"use client";

import { useFileUploader } from "@/hooks/use-file-uploader";
import { FileDropzone } from "@/components/file-dropzone";
import { SVGToolCore } from "./svg-tool-core";

export const SvgToPngTool = () => {
  const fileUploaderProps = useFileUploader();

  return (
    <FileDropzone
      setCurrentFile={fileUploaderProps.handleFileUpload}
      acceptedFileTypes={["image/svg+xml", ".svg"]}
      dropText="Drop SVG file"
    >
      <SVGToolCore fileUploaderProps={fileUploaderProps} />
    </FileDropzone>
  );
};
