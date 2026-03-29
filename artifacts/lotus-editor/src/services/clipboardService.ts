import { GlyphNode } from "@/types/editor";
import { GLYPH_DATASET } from "@/data/glyphs";
import { buildExportSVG } from "./svgBuilder";

export type CopySize = "small" | "large" | "wysiwyg";

export async function copyToClipboard(
  nodes: GlyphNode[],
  size: CopySize,
  quadratSize: number
): Promise<void> {
  if (nodes.length === 0) return;

  const svgString = buildExportSVG(nodes, size, quadratSize);
  const htmlString = `<!DOCTYPE html><html><body>${svgString}</body></html>`;
  const textString = nodes.map((n) => n.glyphId).join(" ");

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([htmlString], { type: "text/html" }),
        "text/plain": new Blob([textString], { type: "text/plain" }),
      }),
    ]);
  } catch {
    await navigator.clipboard.writeText(textString);
  }
}

export interface ParsedNode {
  glyphId: string;
  transform: { rotate: number; scale: number; flipX: boolean; flipY: boolean };
}

export function parseSVGToNodes(svgString: string): ParsedNode[] {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const groups = Array.from(doc.querySelectorAll("svg > g"));
    const glyphIds = new Set(GLYPH_DATASET.map((g) => g.id));

    return groups.map((_g) => ({
      glyphId: [...glyphIds][0],
      transform: { rotate: 0, scale: 1, flipX: false, flipY: false },
    }));
  } catch {
    return [];
  }
}

export function parsePlainTextToNodes(text: string): ParsedNode[] {
  const glyphIds = new Set(GLYPH_DATASET.map((g) => g.id));
  return text
    .trim()
    .split(/\s+/)
    .filter((id) => glyphIds.has(id))
    .map((glyphId) => ({
      glyphId,
      transform: { rotate: 0, scale: 1, flipX: false, flipY: false },
    }));
}

export async function pasteFromClipboard(): Promise<ParsedNode[]> {
  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      if (item.types.includes("text/html")) {
        const blob = await item.getType("text/html");
        const html = await blob.text();
        const match = html.match(/<svg[\s\S]*?<\/svg>/i);
        if (match) {
          const nodes = parseSVGToNodes(match[0]);
          if (nodes.length > 0) return nodes;
        }
      }
      if (item.types.includes("text/plain")) {
        const blob = await item.getType("text/plain");
        const text = await blob.text();
        return parsePlainTextToNodes(text);
      }
    }
  } catch {
    try {
      const text = await navigator.clipboard.readText();
      return parsePlainTextToNodes(text);
    } catch {
      return [];
    }
  }
  return [];
}
