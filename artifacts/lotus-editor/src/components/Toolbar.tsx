import { useEditorStore } from "@/store/editorStore";
import { copyToClipboard, pasteFromClipboard } from "@/services/clipboardService";
import { nanoid } from "nanoid";
import {
  RotateCw,
  FlipHorizontal2,
  FlipVertical2,
  Minus,
  Plus,
  Trash2,
  Copy,
  ClipboardPaste,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Eraser,
} from "lucide-react";
import { useState } from "react";

export function Toolbar() {
  const {
    nodes,
    selectedIds,
    quadratSize,
    zoom,
    updateTransform,
    removeSelected,
    reorderNode,
    setZoom,
    clearAll,
    addGlyph,
  } = useEditorStore();

  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const selectedNodes = nodes.filter((n) => selectedIds.has(n.instanceId));
  const hasSelection = selectedNodes.length > 0;
  const firstSelected = selectedNodes[0];

  const applyToAll = (fn: (id: string) => void) => {
    selectedNodes.forEach((n) => fn(n.instanceId));
  };

  const handleRotate = () => {
    applyToAll((id) => {
      const node = nodes.find((n) => n.instanceId === id)!;
      updateTransform(id, { rotate: (node.transform.rotate + 90) % 360 });
    });
  };

  const handleFlipX = () => {
    applyToAll((id) => {
      const node = nodes.find((n) => n.instanceId === id)!;
      updateTransform(id, { flipX: !node.transform.flipX });
    });
  };

  const handleFlipY = () => {
    applyToAll((id) => {
      const node = nodes.find((n) => n.instanceId === id)!;
      updateTransform(id, { flipY: !node.transform.flipY });
    });
  };

  const handleScale = (delta: number) => {
    applyToAll((id) => {
      const node = nodes.find((n) => n.instanceId === id)!;
      const next = Math.max(0.2, Math.min(3, node.transform.scale + delta));
      updateTransform(id, { scale: +next.toFixed(2) });
    });
  };

  const handleReorder = (dir: "left" | "right") => {
    if (firstSelected) reorderNode(firstSelected.instanceId, dir);
  };

  const handleCopy = async (size: "small" | "large" | "wysiwyg") => {
    const toCopy = hasSelection ? selectedNodes : nodes;
    await copyToClipboard(toCopy, size, quadratSize);
    setCopyFeedback(size);
    setTimeout(() => setCopyFeedback(null), 1500);
  };

  const handlePaste = async () => {
    const parsed = await pasteFromClipboard();
    parsed.forEach((p) => {
      addGlyph(p.glyphId);
    });
  };

  const ToolBtn = ({
    icon: Icon,
    label,
    onClick,
    disabled = false,
    active = false,
    variant = "default",
  }: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
    variant?: "default" | "danger";
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={`tool-btn flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${
        disabled
          ? "opacity-30 cursor-not-allowed"
          : active
          ? "bg-amber-500 text-white shadow-md"
          : variant === "danger"
          ? "text-red-500/70 hover:bg-red-50 hover:text-red-600"
          : "text-amber-800/70 hover:bg-amber-100 hover:text-amber-900"
      }`}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="toolbar flex items-center gap-1 px-3 py-2 h-full">
      <div className="toolbar-logo flex items-center gap-2 mr-3">
        <span className="text-xl">𓂀</span>
        <span className="text-sm font-bold text-amber-800 tracking-wide">
          Lotus
        </span>
      </div>

      <div className="toolbar-divider h-6 w-px bg-amber-200 mx-1" />

      <div className="section-label text-[10px] text-amber-500/70 mr-1 hidden md:block">
        Transform
      </div>

      <ToolBtn
        icon={RotateCw}
        label="Rotate 90°"
        onClick={handleRotate}
        disabled={!hasSelection}
      />
      <ToolBtn
        icon={FlipHorizontal2}
        label="Flip Horizontal"
        onClick={handleFlipX}
        disabled={!hasSelection}
      />
      <ToolBtn
        icon={FlipVertical2}
        label="Flip Vertical"
        onClick={handleFlipY}
        disabled={!hasSelection}
      />

      <div className="toolbar-divider h-6 w-px bg-amber-200 mx-1" />
      <div className="section-label text-[10px] text-amber-500/70 mr-1 hidden md:block">
        Scale
      </div>

      <ToolBtn
        icon={Minus}
        label="Scale Down"
        onClick={() => handleScale(-0.1)}
        disabled={!hasSelection}
      />
      <ToolBtn
        icon={Plus}
        label="Scale Up"
        onClick={() => handleScale(0.1)}
        disabled={!hasSelection}
      />

      {firstSelected && (
        <span className="text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full font-mono min-w-[40px] text-center">
          {(firstSelected.transform.scale * 100).toFixed(0)}%
        </span>
      )}

      <div className="toolbar-divider h-6 w-px bg-amber-200 mx-1" />
      <div className="section-label text-[10px] text-amber-500/70 mr-1 hidden md:block">
        Order
      </div>

      <ToolBtn
        icon={ChevronLeft}
        label="Move Left"
        onClick={() => handleReorder("left")}
        disabled={!firstSelected}
      />
      <ToolBtn
        icon={ChevronRight}
        label="Move Right"
        onClick={() => handleReorder("right")}
        disabled={!firstSelected}
      />

      <div className="toolbar-divider h-6 w-px bg-amber-200 mx-1" />
      <div className="section-label text-[10px] text-amber-500/70 mr-1 hidden md:block">
        Clipboard
      </div>

      <div className="copy-group flex items-center gap-0.5">
        {(["small", "large", "wysiwyg"] as const).map((size) => (
          <button
            key={size}
            onClick={() => handleCopy(size)}
            disabled={nodes.length === 0}
            title={`Copy ${size === "wysiwyg" ? "as-is" : size}`}
            className={`text-[10px] px-2 py-1.5 rounded-lg font-semibold transition-all duration-200 ${
              copyFeedback === size
                ? "bg-green-500 text-white"
                : nodes.length === 0
                ? "opacity-30 cursor-not-allowed text-amber-500"
                : "text-amber-700 hover:bg-amber-100"
            }`}
          >
            <Copy size={12} className="inline mr-0.5" />
            {size === "wysiwyg" ? "1:1" : size.charAt(0).toUpperCase() + size.slice(1)}
          </button>
        ))}
      </div>

      <ToolBtn
        icon={ClipboardPaste}
        label="Paste (SVG or glyph IDs)"
        onClick={handlePaste}
      />

      <div className="toolbar-divider h-6 w-px bg-amber-200 mx-1" />
      <div className="section-label text-[10px] text-amber-500/70 mr-1 hidden md:block">
        View
      </div>

      <ToolBtn
        icon={ZoomOut}
        label="Zoom Out"
        onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
      />
      <span className="text-xs text-amber-600 font-mono min-w-[36px] text-center">
        {Math.round(zoom * 100)}%
      </span>
      <ToolBtn
        icon={ZoomIn}
        label="Zoom In"
        onClick={() => setZoom(Math.min(4, zoom + 0.25))}
      />

      <div className="ml-auto flex items-center gap-1">
        <ToolBtn
          icon={Trash2}
          label="Delete Selected"
          onClick={removeSelected}
          disabled={!hasSelection}
          variant="danger"
        />
        <ToolBtn
          icon={Eraser}
          label="Clear All"
          onClick={clearAll}
          disabled={nodes.length === 0}
          variant="danger"
        />
      </div>
    </div>
  );
}
