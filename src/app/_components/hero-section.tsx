import { cn } from "@/lib/utils";
import { USER } from "@/data/site";

export const HeroSection = () => {
  return (
    <div
      className={cn(
        "mx-auto space-y-4 md:max-w-4xl",
        "text-center text-balance",
      )}
    >
      <h1 className="text-xl">{USER.heroSection.title}</h1>
      <p className="text-gray-600">{USER.heroSection.subtitle}</p>
    </div>
  );
};
