import { GlyphNode, GlyphTransform } from "@/types/editor";
import { GLYPH_DATASET } from "@/data/glyphs";

export const QUADRAT = 100;
const SOURCE_SIZE = 1800;

export function buildTransformAttr(
  transform: GlyphTransform,
  x: number,
  cx: number,
  cy: number
): string {
  const { rotate, scale, flipX, flipY } = transform;
  const scaleX = flipX ? -scale : scale;
  const scaleY = flipY ? -scale : scale;

  return [
    `translate(${x + cx}, ${cy})`,
    `scale(${scaleX}, ${scaleY})`,
    `rotate(${rotate})`,
    `translate(${-cx}, ${-cy})`,
  ].join(" ");
}

export function buildEditorSVG(
  nodes: GlyphNode[],
  quadratSize: number = QUADRAT
): string {
  if (nodes.length === 0) return "";

  const glyphMap = new Map(GLYPH_DATASET.map((g) => [g.id, g]));
  const totalWidth = nodes.length * quadratSize;
  const totalHeight = quadratSize;

  const scale = quadratSize / SOURCE_SIZE;
  const cx = SOURCE_SIZE / 2;
  const cy = SOURCE_SIZE / 2;

  const children = nodes
    .map((node, i) => {
      const glyph = glyphMap.get(node.glyphId);
      if (!glyph) return "";
      const x = i * quadratSize;
      const { rotate, scale: s, flipX, flipY } = node.transform;
      const scaleX = flipX ? -s * scale : s * scale;
      const scaleY = flipY ? -s * scale : s * scale;
      const transform = [
        `translate(${x + quadratSize / 2}, ${quadratSize / 2})`,
        `scale(${scaleX}, ${scaleY})`,
        `rotate(${rotate})`,
        `translate(${-cx}, ${-cy})`,
      ].join(" ");

      return `<g transform="${transform}">${glyph.svgContent}</g>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">\n${children}\n</svg>`;
}

export function buildExportSVG(
  nodes: GlyphNode[],
  size: "small" | "large" | "wysiwyg",
  quadratSize: number = QUADRAT
): string {
  const sizeMap = { small: 40, large: 120, wysiwyg: quadratSize };
  return buildEditorSVG(nodes, sizeMap[size]);
}
