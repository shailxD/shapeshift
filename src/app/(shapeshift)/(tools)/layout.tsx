"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleBackClick}
        className="fixed top-14 left-4 z-50"
      >
        <ArrowLeft />
        Back
      </Button>
      {children}
    </>
  );
}
