import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { ShapeShiftLogo } from "@/assets/logos";

export const HeaderSection = () => {
  return (
    <header
      className={cn(
        "bg-background overflow-x-hidden",
        "flex items-center justify-between",
        "w-full max-w-screen",
        "px-4 py-2",
        "sticky top-0 z-50",
      )}
    >
      <div className="flex items-center gap-3">
        <ShapeShiftLogo className="h-7 w-7 sm:h-8 sm:w-8" />

        <div className="flex gap-1 text-lg leading-none sm:text-xl">
          <p className="font-bold">SHAPE</p>
          <p className="font-base">SHIFT</p>
        </div>
      </div>

      <ThemeSwitcher />
    </header>
  );
};
