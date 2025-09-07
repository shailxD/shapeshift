import { cn } from "@/lib/utils";
import { FooterSection, HeaderSection } from "@/app/_components";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-center font-sans">
      <HeaderSection />
      <main
        className={cn(
          "flex flex-grow flex-col gap-4",
          "items-center justify-center",
          "max-w-screen overflow-x-hidden px-4",
        )}
      >
        {children}
      </main>
      <FooterSection />
    </div>
  );
}
