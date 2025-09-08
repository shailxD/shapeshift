"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { createHighlighter } from "shiki";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodePreviewProps {
  code: string;
  language: "jsx" | "tsx";
  fileName: string;
  className?: string;
}

export function CodePreview({
  code,
  language,
  fileName,
  className,
}: CodePreviewProps) {
  const { theme, systemTheme } = useTheme();
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Get the actual theme being used (resolving 'system' to actual theme)
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let isCancelled = false;

    const highlightCode = async () => {
      try {
        setLoading(true);
        const highlighter = await createHighlighter({
          themes: ["github-light", "github-dark"],
          langs: ["tsx", "jsx", "typescript", "javascript"],
        });

        if (isCancelled) return;

        const highlighted = highlighter.codeToHtml(code, {
          lang: language === "tsx" ? "typescript" : "javascript",
          theme: isDarkMode ? "github-dark" : "github-light",
        });

        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        // Fallback to plain code with basic styling
        setHighlightedCode(
          `<pre class="bg-muted/50 p-4 rounded overflow-auto"><code>${code}</code></pre>`,
        );
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    highlightCode();

    return () => {
      isCancelled = true;
    };
  }, [code, language, isDarkMode, mounted]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.${language}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!mounted) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted h-64 animate-pulse rounded-md" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">
            Generated Component
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {language.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="bg-muted/50 h-64 animate-pulse rounded-md" />
        ) : (
          <div
            className="max-h-96 overflow-auto rounded-md border text-sm [&>pre]:!m-0 [&>pre]:!bg-transparent [&>pre]:!p-4"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        )}
      </CardContent>
    </Card>
  );
}
