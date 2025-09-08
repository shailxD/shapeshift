export interface SvgToReactOptions {
  outputType: "jsx" | "tsx";
}

export function toPascalCase(str: string): string {
  // Remove file extension and clean the string
  const cleaned = str
    .replace(/\.svg$/i, "") // Remove .svg extension
    .replace(/[^a-zA-Z0-9]/g, " ") // Replace non-alphanumeric with spaces
    .trim();

  // Split into words and filter out empty strings
  const words = cleaned.split(" ").filter(Boolean);

  // If no valid words or all words are numbers, use a default prefix
  if (words.length === 0 || words.every((word) => /^\d+$/.test(word))) {
    const numberPart = words.join("");
    return numberPart ? `Icon${numberPart}` : "SvgIcon";
  }

  // Convert to PascalCase
  const pascalCase = words
    .map((word) => {
      // If word starts with a number, prefix it with a letter
      if (/^\d/.test(word)) {
        return (
          "Icon" + word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");

  // Ensure the result starts with a capital letter (React component requirement)
  return pascalCase.charAt(0).toUpperCase() + pascalCase.slice(1);
}

export function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function convertStyleStringToObject(styleString: string): string {
  // Parse CSS style string and convert to React style object
  const styles = styleString
    .split(";")
    .filter(Boolean)
    .map((style) => {
      const [property, value] = style.split(":").map((s) => s.trim());
      if (!property || !value) return null;

      // Convert kebab-case to camelCase
      const camelProperty = kebabToCamelCase(property);
      return `${camelProperty}: "${value}"`;
    })
    .filter(Boolean);

  return `{ ${styles.join(", ")} }`;
}

export function convertStyleAttributes(svgContent: string): string {
  // Convert style="..." to style={{...}}
  return svgContent.replace(/style="([^"]*)"/g, (match, styleString) => {
    return `style={${convertStyleStringToObject(styleString)}}`;
  });
}

export function formatSvgForReact(svgContent: string): string {
  // Remove XML declaration
  svgContent = svgContent.replace(/<\?xml[^>]*\?>\s*/g, "");

  // Format the SVG with proper indentation and line breaks
  // This is a simple formatter - for production you might want a more sophisticated one
  let formatted = svgContent;

  // Add line breaks and indentation for better readability
  formatted = formatted.replace(/></g, ">\n<");
  formatted = formatted.replace(/^\s+|\s+$/gm, ""); // Trim lines

  // Add proper indentation
  const lines = formatted.split("\n");
  let indentLevel = 0;
  const indentSize = 2;

  const formattedLines = lines.map((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return "";

    // Decrease indent for closing tags
    if (trimmedLine.startsWith("</")) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const indentedLine = " ".repeat(indentLevel * indentSize) + trimmedLine;

    // Increase indent for opening tags (but not self-closing)
    if (
      trimmedLine.startsWith("<") &&
      !trimmedLine.startsWith("</") &&
      !trimmedLine.endsWith("/>")
    ) {
      indentLevel++;
    }

    return indentedLine;
  });

  return formattedLines.join("\n");
}

export function convertAttributesToJsx(svgContent: string): string {
  // Convert class to className
  svgContent = svgContent.replace(/\bclass=/g, "className=");

  // Convert style attributes first
  svgContent = convertStyleAttributes(svgContent);

  // Convert kebab-case attributes to camelCase
  const kebabAttributes = [
    "stroke-width",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-miterlimit",
    "fill-rule",
    "clip-rule",
    "font-family",
    "font-size",
    "font-weight",
    "text-anchor",
    "dominant-baseline",
    "baseline-shift",
    "letter-spacing",
    "word-spacing",
    "writing-mode",
    "glyph-orientation-vertical",
    "glyph-orientation-horizontal",
    "xml:space",
    "xmlns:xlink",
  ];

  kebabAttributes.forEach((attr) => {
    const camelCase = kebabToCamelCase(attr);
    const regex = new RegExp(`\\b${attr}=`, "g");
    svgContent = svgContent.replace(regex, `${camelCase}=`);
  });

  // Handle xml:space and xmlns:xlink specially
  svgContent = svgContent.replace(/xml:space=/g, "xmlSpace=");
  svgContent = svgContent.replace(/xmlns:xlink=/g, "xmlnsXlink=");

  return svgContent;
}

export function extractViewBox(svgContent: string): string | null {
  const match = svgContent.match(/viewBox=(["'])([^"']+)\1/);
  return match ? match[2] : null;
}

export function generateReactComponent(
  svgContent: string,
  fileName: string,
  options: SvgToReactOptions,
): { code: string; warnings: string[] } {
  const warnings: string[] = [];
  let processedSvg = svgContent;

  // Get component name from filename
  const componentName = toPascalCase(fileName.replace(/\.svg$/, ""));

  // Remove XML declaration
  processedSvg = processedSvg.replace(/<\?xml[^>]*\?>\s*/g, "");

  // Check for viewBox
  const viewBox = extractViewBox(processedSvg);
  if (!viewBox) {
    warnings.push(
      "SVG is missing a viewBox attribute. Consider adding one for better scalability.",
    );
  }

  // Convert to JSX attributes
  processedSvg = convertAttributesToJsx(processedSvg);

  // Extract SVG opening tag attributes and inner content
  const svgOpenMatch = processedSvg.match(/<svg([^>]*)>/);
  const svgInnerMatch = processedSvg.match(/<svg[^>]*>([\s\S]*)<\/svg>/);

  if (!svgOpenMatch || !svgInnerMatch) {
    throw new Error("Invalid SVG content");
  }

  const svgAttributesRaw = svgOpenMatch[1];
  const svgInnerContent = svgInnerMatch[1];

  // Parse SVG attributes and format them properly
  const attributes: string[] = [];

  // Extract individual attributes using a more robust regex
  const attrMatches = svgAttributesRaw.match(/\w+(?::\w+)?="[^"]*"/g) || [];

  attrMatches.forEach((attr) => {
    const [name, value] = attr.split("=");
    const cleanName = name.trim();
    const cleanValue = value.replace(/"/g, "");

    // Skip version attribute as it's not needed in React
    if (cleanName === "version") return;

    // Format the attribute for JSX
    attributes.push(`${cleanName}="${cleanValue}"`);
  });

  // Generate imports
  const imports =
    options.outputType === "tsx"
      ? `import * as React from "react";\nimport type { SVGProps } from "react";`
      : `import * as React from "react";`;

  // Generate props type
  const propsType =
    options.outputType === "tsx"
      ? "(props: SVGProps<SVGSVGElement>)"
      : "(props)";

  // Format the inner content with proper indentation
  const formattedInnerContent = svgInnerContent
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `    ${line}`)
    .join("\n");

  // Build the attributes string
  const attributesString =
    attributes.length > 0 ? "\n    " + attributes.join("\n    ") : "";

  // Generate the formatted component
  const component = `export const ${componentName} = ${propsType} => (
  <svg${attributesString}
    className="w-6 h-6"
    aria-hidden="true"
    {...props}
  >
${formattedInnerContent}
  </svg>
);`;

  const code = `${imports}\n\n${component}`;

  return { code, warnings };
}
