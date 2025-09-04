import { cn } from "@/lib/utils";
import { HeroSection } from "./_components/hero-section";
import { FooterSection } from "./_components/footer-section";
import { HeaderSection } from "./_components/header-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center font-sans">
      <HeaderSection />
      <main
        className={cn(
          "flex flex-grow flex-col",
          "items-center justify-center",
          "max-w-screen overflow-x-hidden px-4",
        )}
      >
        <HeroSection />
      </main>
      <FooterSection />
    </div>
  );
}
