import { useRef } from "react";
import { useEditorStore } from "@/store/editorStore";
import { GLYPH_DATASET } from "@/data/glyphs";
import { GlyphNode } from "@/types/editor";

const SOURCE_SIZE = 1800;

export function EditorCanvas() {
  const { nodes, selectedIds, quadratSize, zoom, selectNode, deselectAll } =
    useEditorStore();
  const svgRef = useRef<SVGSVGElement>(null);

  const totalWidth = Math.max(nodes.length * quadratSize, quadratSize * 6);
  const totalHeight = quadratSize + 40;
  const glyphMap = new Map(GLYPH_DATASET.map((g) => [g.id, g]));

  const scale = quadratSize / SOURCE_SIZE;
  const cx = SOURCE_SIZE / 2;
  const cy = SOURCE_SIZE / 2;

  const handleBgClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as SVGElement).tagName === "svg") {
      deselectAll();
    }
  };

  return (
    <div className="canvas-wrapper w-full h-full overflow-auto flex items-start justify-center p-8">
      <div
        className="canvas-container relative"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          transition: "transform 0.2s ease",
        }}
      >
        {nodes.length === 0 ? (
          <div className="empty-canvas flex flex-col items-center justify-center min-h-48 min-w-[500px] rounded-2xl border-2 border-dashed border-amber-300/60 bg-amber-50/30">
            <div className="lotus-icon text-5xl mb-3 opacity-40">𓂀</div>
            <p className="text-amber-600/60 text-sm font-medium">
              Click a glyph from the palette to begin
            </p>
            <p className="text-amber-400/50 text-xs mt-1">
              Your composition will appear here
            </p>
          </div>
        ) : (
          <svg
            ref={svgRef}
            width={totalWidth}
            height={totalHeight}
            viewBox={`0 0 ${totalWidth} ${totalHeight}`}
            className="editor-svg"
            onClick={handleBgClick}
            style={{
              background: "transparent",
              cursor: "default",
            }}
          >
            <defs>
              <filter id="selected-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.9  0 0 0 0 0.6  0 0 0 0 0  0 0 0 0.8 0"
                  result="glow"
                />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {nodes.map((node, i) => (
              <GlyphNodeSVG
                key={node.instanceId}
                node={node}
                index={i}
                quadratSize={quadratSize}
                scale={scale}
                cx={cx}
                cy={cy}
                selected={selectedIds.has(node.instanceId)}
                glyphContent={glyphMap.get(node.glyphId)?.svgContent ?? ""}
                onClick={(e) => {
                  e.stopPropagation();
                  selectNode(node.instanceId, e.metaKey || e.ctrlKey);
                }}
              />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}

interface GlyphNodeSVGProps {
  node: GlyphNode;
  index: number;
  quadratSize: number;
  scale: number;
  cx: number;
  cy: number;
  selected: boolean;
  glyphContent: string;
  onClick: (e: React.MouseEvent) => void;
}

function GlyphNodeSVG({
  node,
  index,
  quadratSize,
  scale,
  cx,
  cy,
  selected,
  glyphContent,
  onClick,
}: GlyphNodeSVGProps) {
  const x = index * quadratSize;
  const { rotate, scale: s, flipX, flipY } = node.transform;
  const scaleX = flipX ? -s * scale : s * scale;
  const scaleY = flipY ? -s * scale : s * scale;
  const halfQ = quadratSize / 2;

  const transform = [
    `translate(${x + halfQ}, ${halfQ + 20})`,
    `scale(${scaleX}, ${scaleY})`,
    `rotate(${rotate})`,
    `translate(${-cx}, ${-cy})`,
  ].join(" ");

  return (
    <g
      className="glyph-node"
      onClick={onClick}
      style={{ cursor: "pointer" }}
      filter={selected ? "url(#selected-glow)" : undefined}
    >
      {selected && (
        <rect
          x={x + 2}
          y={22}
          width={quadratSize - 4}
          height={quadratSize - 4}
          rx={6}
          fill="rgba(245, 158, 11, 0.12)"
          stroke="rgba(245, 158, 11, 0.7)"
          strokeWidth={2}
          strokeDasharray="5,3"
        />
      )}
      <g
        transform={transform}
        dangerouslySetInnerHTML={{ __html: glyphContent }}
        style={{ color: selected ? "#b45309" : "#78350f" }}
      />
    </g>
  );
}
