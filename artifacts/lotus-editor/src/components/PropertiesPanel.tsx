import { useEditorStore } from "@/store/editorStore";
import { GLYPH_DATASET } from "@/data/glyphs";
import { RotateCw, FlipHorizontal2, FlipVertical2 } from "lucide-react";

export function PropertiesPanel() {
  const { nodes, selectedIds, updateTransform } = useEditorStore();

  const selectedNodes = nodes.filter((n) => selectedIds.has(n.instanceId));

  if (selectedNodes.length === 0) {
    return (
      <div className="properties-panel h-full flex flex-col">
        <div className="panel-header px-4 py-3 border-b border-amber-200/60">
          <h3 className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            Properties
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-amber-400/60 text-xs text-center px-4">
            Select a glyph to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const node = selectedNodes[0];
  const glyph = GLYPH_DATASET.find((g) => g.id === node.glyphId);
  const { rotate, scale, flipX, flipY } = node.transform;

  const handleRotate = (deg: number) => {
    selectedNodes.forEach((n) =>
      updateTransform(n.instanceId, { rotate: deg })
    );
  };

  const handleScale = (val: number) => {
    selectedNodes.forEach((n) => updateTransform(n.instanceId, { scale: val }));
  };

  return (
    <div className="properties-panel h-full flex flex-col">
      <div className="panel-header px-4 py-3 border-b border-amber-200/60">
        <h3 className="text-xs font-bold text-amber-700 uppercase tracking-widest">
          Properties
        </h3>
        {selectedNodes.length > 1 && (
          <span className="text-[10px] text-amber-500/70 mt-0.5 block">
            {selectedNodes.length} selected
          </span>
        )}
      </div>

      <div className="panel-body flex-1 overflow-y-auto p-4 space-y-5">
        {glyph && (
          <div className="glyph-info">
            <div className="glyph-preview-large w-full aspect-square max-w-24 mx-auto mb-3 p-3 bg-amber-50 rounded-xl border border-amber-200/60">
              <svg
                viewBox={glyph.viewBox}
                className="w-full h-full"
                style={{ color: "#92400e" }}
                dangerouslySetInnerHTML={{ __html: glyph.svgContent }}
              />
            </div>
            <div className="text-center">
              <p className="font-bold text-amber-800 text-sm">{glyph.id}</p>
              <p className="text-amber-500 text-xs">{glyph.label}</p>
              <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full">
                {glyph.category}
              </span>
            </div>
          </div>
        )}

        <div className="section">
          <label className="prop-label text-[10px] font-semibold text-amber-600/80 uppercase tracking-widest block mb-2">
            Rotation
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[0, 90, 180, 270].map((deg) => (
              <button
                key={deg}
                onClick={() => handleRotate(deg)}
                className={`py-1.5 text-xs rounded-lg transition-all font-medium border ${
                  rotate === deg
                    ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                    : "bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-100"
                }`}
              >
                {deg}°
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={359}
              value={rotate}
              onChange={(e) => handleRotate(Number(e.target.value))}
              className="flex-1 accent-amber-500"
            />
            <span className="text-xs font-mono text-amber-700 w-10 text-right">
              {rotate}°
            </span>
          </div>
        </div>

        <div className="section">
          <label className="prop-label text-[10px] font-semibold text-amber-600/80 uppercase tracking-widest block mb-2">
            Scale
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0.2}
              max={3}
              step={0.05}
              value={scale}
              onChange={(e) => handleScale(Number(e.target.value))}
              className="flex-1 accent-amber-500"
            />
            <span className="text-xs font-mono text-amber-700 w-12 text-right">
              {(scale * 100).toFixed(0)}%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 mt-2">
            {[0.5, 1, 1.5].map((s) => (
              <button
                key={s}
                onClick={() => handleScale(s)}
                className={`py-1 text-xs rounded-lg transition-all font-medium border ${
                  Math.abs(scale - s) < 0.01
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-100"
                }`}
              >
                {s === 1 ? "100%" : s === 0.5 ? "50%" : "150%"}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <label className="prop-label text-[10px] font-semibold text-amber-600/80 uppercase tracking-widest block mb-2">
            Flip
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() =>
                selectedNodes.forEach((n) =>
                  updateTransform(n.instanceId, { flipX: !n.transform.flipX })
                )
              }
              className={`flex items-center justify-center gap-1.5 py-2 text-xs rounded-lg transition-all font-medium border ${
                flipX
                  ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                  : "bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-100"
              }`}
            >
              <FlipHorizontal2 size={13} />
              H-Flip
            </button>
            <button
              onClick={() =>
                selectedNodes.forEach((n) =>
                  updateTransform(n.instanceId, { flipY: !n.transform.flipY })
                )
              }
              className={`flex items-center justify-center gap-1.5 py-2 text-xs rounded-lg transition-all font-medium border ${
                flipY
                  ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                  : "bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-100"
              }`}
            >
              <FlipVertical2 size={13} />
              V-Flip
            </button>
          </div>
        </div>

        <div className="section bg-amber-50/60 rounded-xl p-3 border border-amber-200/40">
          <p className="text-[10px] font-semibold text-amber-600/80 uppercase tracking-widest mb-1.5">
            Glyph ID
          </p>
          <p className="font-mono text-sm font-bold text-amber-800">
            {node.glyphId}
          </p>
          <p className="text-[10px] text-amber-500/70 mt-1 font-mono">
            instance: {node.instanceId.slice(0, 8)}
          </p>
        </div>
      </div>
    </div>
  );
}
