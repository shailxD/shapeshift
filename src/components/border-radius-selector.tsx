import React, { useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BorderRadiusSelectorProps {
  title: string;
  options: number[];
  selected: number | "custom";
  onChange: (value: number | "custom") => void;
  customValue?: number;
  onCustomValueChange?: (value: number) => void;
}

export function BorderRadiusSelector({
  title,
  options,
  selected,
  onChange,
  customValue,
  onCustomValueChange,
}: BorderRadiusSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedRef.current && highlightRef.current && containerRef.current) {
      const container = containerRef.current;
      const selected = selectedRef.current;
      const highlight = highlightRef.current;

      const containerRect = container.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();

      highlight.style.left = `${selectedRect.left - containerRect.left}px`;
      highlight.style.width = `${selectedRect.width}px`;
    }
  }, [selected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(999, Math.max(0, parseInt(e.target.value) || 0));
    onCustomValueChange?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;

    e.preventDefault();
    const currentValue = customValue ?? 0;
    let step = 1;

    if (e.shiftKey) step = 10;
    if (e.altKey) step = 0.1;

    const newValue =
      e.key === "ArrowUp" ? currentValue + step : currentValue - step;

    const clampedValue = Math.min(
      999,
      Math.max(0, Number(newValue.toFixed(1))),
    );
    onCustomValueChange?.(clampedValue);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Label className="text-muted-foreground text-sm">{title}</Label>
      <div className="flex flex-col items-center gap-3">
        <div
          ref={containerRef}
          className="bg-accent relative inline-flex rounded-lg p-1"
        >
          <div
            ref={highlightRef}
            className="bg-primary absolute top-1 h-[calc(100%-8px)] rounded-md transition-all duration-200"
          />
          {[...options, "custom" as const].map((option) => (
            <button
              key={String(option)}
              ref={option === selected ? selectedRef : null}
              onClick={() =>
                onChange(typeof option === "number" ? option : "custom")
              }
              className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                option === selected
                  ? "text-primary-foreground"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {option === "custom" ? "Custom" : option}
            </button>
          ))}
        </div>
        {selected === "custom" && (
          <div className="flex flex-col items-center gap-2">
            <Label
              htmlFor="custom-radius"
              className="text-muted-foreground text-xs"
            >
              Custom Radius
            </Label>
            <div className="relative">
              <Input
                id="custom-radius"
                type="number"
                min="0"
                max="999"
                step="1"
                value={customValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-24 pr-8 text-center"
                placeholder="0"
              />
              <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-xs">
                px
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
