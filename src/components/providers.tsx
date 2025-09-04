"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      storageKey="theme"
      attribute="class"
      defaultTheme="system"
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
