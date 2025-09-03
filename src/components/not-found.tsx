import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-screen flex-col items-center justify-center",
        className
      )}
    >
      <svg
        viewBox="0 0 451 451"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-42 w-full text-neutral-800 dark:text-neutral-200"
      >
        <g clipPath="url(#clip0_825_5967)">
          <path
            d="M300.5 0.5H150.5V150.5H300.5V0.5Z"
            stroke="currentColor"
            strokeMiterlimit="10"
            fill="none"
          />
          <path
            d="M300.5 300.5V450.5H0.5V150.5H150.5V300.5H300.5Z"
            stroke="currentColor"
            strokeMiterlimit="10"
            fill="none"
          />
          <path
            d="M450.5 0.5H375.5V75.5H450.5V0.5Z"
            stroke="currentColor"
            strokeMiterlimit="10"
            fill="none"
          />
          <path
            d="M450.5 150.5H300.5V300.5H450.5V150.5Z"
            stroke="currentColor"
            strokeMiterlimit="10"
            fill="none"
          />
        </g>
        <defs>
          <clipPath id="clip0_825_5967">
            <rect width="451" height="451" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <h1 className="mt-8 mb-6 font-mono text-8xl font-medium">404</h1>

      <Button variant="default" asChild>
        <Link href="/">
          Go to Home
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
}
