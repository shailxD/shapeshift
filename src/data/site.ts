import { ToolsProps } from "@/types/site";
import {
  IconBorderRadius,
  IconFileTypePng,
  IconShape,
  IconCode,
} from "@tabler/icons-react";

export const USER = {
  firstName: "Shail",
  lastName: "Teotia",
  displayName: "Shail",
  username: "shailxD",
  githubUrl: "https://github.com/shailxD",
  email: "shailteotia2003@gmail.com",
  heroSection: {
    title:
      "Hi 👋 I was annoyed these tools weren't free or simple—so I built them.",
    subtitle: "A growing set of image tools. All free. Simple. No BS.",
  },
};

export const SOURCE_CODE_GITHUB_REPO = "shailxD/shapeshift";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/shailxD/shapeshift";

export const SITE_INFO = {
  name: "ShapeShift",
  subtitle: "Fast, Free, Simple Image Tools",
  description:
    "A growing set of image tools. All free. Simple. No BS. Built because the existing ones were annoying or simple enough.",
  keywords:
    "image tools, free image converter, svg to png, square image generator, corner rounder, online image utilities, simple image editor, quick image tools",
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const TOOLS: Array<ToolsProps> = [
  {
    id: "svg-to-png",
    title: "SVG to PNG Converter",
    description: "Convert SVG files to high-quality PNG images",
    href: "/svg-to-png",
    icon: IconFileTypePng,
  },
  {
    id: "svg-to-react",
    title: "SVG to React Component",
    description:
      "Convert SVG files to React components with TypeScript support",
    href: "/svg-to-react",
    icon: IconCode,
  },
  {
    id: "square-image",
    title: "Square Image Generator",
    description: "Transform any image into a perfect square",
    href: "/square-image",
    icon: IconShape,
  },
  {
    id: "corner-rounder",
    title: "Corner Rounder",
    description: "Add rounded corners to your images",
    href: "/rounded-border",
    icon: IconBorderRadius,
  },
];
