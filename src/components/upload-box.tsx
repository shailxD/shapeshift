import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadBoxProps {
  title: string;
  subtitle?: string;
  description: string;
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadBox({
  title,
  subtitle,
  description,
  accept,
  onChange,
}: UploadBoxProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-foreground text-xl font-semibold">{title}</h2>
        {subtitle && (
          <Badge variant="secondary" className="text-sm">
            {subtitle}
          </Badge>
        )}
      </div>

      <Card
        className={cn(
          "hover:border-muted-foreground/40 w-80 transition-colors",
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56",
        )}
      >
        <CardContent className="flex flex-col items-center justify-center gap-6">
          <Upload className="text-muted-foreground h-12 w-12" />

          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-muted-foreground text-sm font-medium">
              Drag and Drop
            </p>
            <p className="text-muted-foreground/70 text-sm">or</p>
          </div>

          <Button variant="default" className="relative overflow-hidden">
            <span>{description}</span>
            <input
              type="file"
              onChange={onChange}
              accept={accept}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
