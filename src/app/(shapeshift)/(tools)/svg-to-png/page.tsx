import { SvgToPngTool } from "@/app/_components/tools/svg-to-png-tool";

export const metadata = {
  title: "SVG to PNG Converter",
  description: "Convert SVGs to PNGs – and upscale them too.",
};

export default function SVGToolPage() {
  return <SvgToPngTool />;
}
