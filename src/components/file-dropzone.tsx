import React, { useCallback, useState, useRef } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  children: React.ReactNode;
  acceptedFileTypes: string[];
  dropText: string;
  setCurrentFile: (file: File) => void;
}

export function FileDropzone({
  children,
  acceptedFileTypes,
  dropText,
  setCurrentFile,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;

    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;

    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;

      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const droppedFile = files[0];

        if (!droppedFile) {
          toast("No files dropped", {
            description: "Please try again.",
          });
          throw new Error("No files dropped");
        }

        if (
          !acceptedFileTypes.includes(droppedFile.type) &&
          !acceptedFileTypes.some((type) =>
            droppedFile.name.toLowerCase().endsWith(type.replace("*", "")),
          )
        ) {
          toast("Invalid file type.", {
            description: "Please upload a supported file type.",
          });
          throw new Error("Invalid file");
        }

        setCurrentFile(droppedFile);
      }
    },
    [acceptedFileTypes, setCurrentFile],
  );

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className="h-full w-full"
    >
      {isDragging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-background/90 absolute inset-0 backdrop-blur-sm" />
          <div
            className={cn(
              "relative flex h-[90%] w-[90%] transform items-center justify-center",
              "border-primary/50 bg-primary/5 rounded-xl border-2 border-dashed",
              "animate-in fade-in zoom-in duration-200 ease-out",
            )}
          >
            <p className="text-primary text-2xl font-semibold">{dropText}</p>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
