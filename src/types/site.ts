import { FC } from "react";

export interface TablerIconProps {
  size?: number;
  color?: string;
  stroke?: number;
  className?: string;
}

export interface ToolsProps {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: FC<TablerIconProps>;
}
