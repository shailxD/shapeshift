import { PngToWebpTool } from "@/app/_components/tools/png-to-webp-tool";

export const metadata = {
  title: "PNG to WebP Converter",
  description:
    "Convert PNG files to WebP format with customizable quality settings for better web performance.",
};

export default function PngToWebpPage() {
  return <PngToWebpTool />;
}
