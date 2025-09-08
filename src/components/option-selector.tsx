"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface OptionSelectorProps<T extends string | number> {
  title: string;
  options: T[];
  selected: T;
  onChange: (value: T) => void;
  formatOption?: (option: T) => string;
}

export function OptionSelector<T extends string | number>({
  title,
  options,
  selected,
  onChange,
  formatOption = (option) => `${option}`,
}: OptionSelectorProps<T>) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Label className="text-muted-foreground text-sm">{title}</Label>
      <div className="bg-muted inline-flex rounded-lg border p-1">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onChange(option)}
            variant={option === selected ? "default" : "ghost"}
            size="sm"
            className="text-sm"
          >
            {formatOption(option)}
          </Button>
        ))}
      </div>
    </div>
  );
}
