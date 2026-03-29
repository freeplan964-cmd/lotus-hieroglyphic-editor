import { useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { copyToClipboard, pasteFromClipboard } from "@/services/clipboardService";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  const applyToAll = (fn: (id: string) => void) =>
    selectedNodes.forEach((n) => fn(n.instanceId));

  const handleRotate = () =>
    applyToAll((id) => {
      const node = nodes.find((n) => n.instanceId === id)!;
      updateTransform(id, { rotate: (node.transform.rotate + 90) % 360 });
    });

  const handleFlipX = () =>
    applyToAll((id) => {
      const node = nodes.find((n) => n.instanceId === id)!;
      updateTransform(id, { flipX: !node.transform.flipX });
    });

  const handleFlipY = () =>
    applyToAll((id) => {
      const node = nodes.find((n) => n.instanceId === id)!;
      updateTransform(id, { flipY: !node.transform.flipY });
    });

  const handleScale = (delta: number) =>
    applyToAll((id) => {
      const node = nodes.find((n) => n.instanceId === id)!;
      const next = Math.max(0.2, Math.min(3, node.transform.scale + delta));
      updateTransform(id, { scale: +next.toFixed(2) });
    });

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
    parsed.forEach((p) => addGlyph(p.glyphId));
  };

  return (
    <nav
      role="toolbar"
      aria-label="Editor toolbar"
      className="flex items-center gap-0.5 px-2 sm:px-3 h-full overflow-x-auto"
    >
      {/* Logo */}
      <div className="flex items-center gap-1.5 mr-2 shrink-0">
        <span className="text-lg leading-none" aria-hidden>𓂀</span>
        <span className="text-sm font-bold text-primary tracking-wide hidden sm:block">
          Lotus
        </span>
      </div>

      <Separator orientation="vertical" className="h-5 mx-1 shrink-0" />

      {/* Transform group */}
      <div className="flex items-center gap-0.5 shrink-0" role="group" aria-label="Transform">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={!hasSelection}
              onClick={handleRotate}
              aria-label="Rotate 90°"
            >
              <RotateCw size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rotate 90°</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={!hasSelection}
              onClick={handleFlipX}
              aria-label="Flip horizontal"
            >
              <FlipHorizontal2 size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Flip Horizontal</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={!hasSelection}
              onClick={handleFlipY}
              aria-label="Flip vertical"
            >
              <FlipVertical2 size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Flip Vertical</TooltipContent>
        </Tooltip>
      </div>

      <Separator orientation="vertical" className="h-5 mx-1 shrink-0" />

      {/* Scale group */}
      <div className="flex items-center gap-0.5 shrink-0" role="group" aria-label="Scale">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={!hasSelection}
              onClick={() => handleScale(-0.1)}
              aria-label="Scale down"
            >
              <Minus size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Scale Down</TooltipContent>
        </Tooltip>

        {firstSelected ? (
          <Badge variant="secondary" className="font-mono text-[10px] px-1.5 py-0.5 min-w-[42px] justify-center">
            {(firstSelected.transform.scale * 100).toFixed(0)}%
          </Badge>
        ) : (
          <Badge variant="outline" className="font-mono text-[10px] px-1.5 py-0.5 min-w-[42px] justify-center opacity-40">
            100%
          </Badge>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={!hasSelection}
              onClick={() => handleScale(0.1)}
              aria-label="Scale up"
            >
              <Plus size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Scale Up</TooltipContent>
        </Tooltip>
      </div>

      <Separator orientation="vertical" className="h-5 mx-1 shrink-0" />

      {/* Order group */}
      <div className="flex items-center gap-0.5 shrink-0" role="group" aria-label="Reorder">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={!firstSelected}
              onClick={() => handleReorder("left")}
              aria-label="Move glyph left"
            >
              <ChevronLeft size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move Left</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={!firstSelected}
              onClick={() => handleReorder("right")}
              aria-label="Move glyph right"
            >
              <ChevronRight size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move Right</TooltipContent>
        </Tooltip>
      </div>

      <Separator orientation="vertical" className="h-5 mx-1 shrink-0" />

      {/* Clipboard group */}
      <div className="flex items-center gap-0.5 shrink-0" role="group" aria-label="Clipboard">
        {(["small", "large", "wysiwyg"] as const).map((size) => {
          const label = size === "wysiwyg" ? "1:1" : size === "small" ? "S" : "L";
          const fullLabel = size === "wysiwyg" ? "Copy 1:1 (as-is)" : `Copy ${size}`;
          const copied = copyFeedback === size;
          return (
            <Tooltip key={size}>
              <TooltipTrigger asChild>
                <Button
                  variant={copied ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-8 px-2 text-[11px] font-semibold gap-1",
                    copied && "bg-green-600 text-white hover:bg-green-700"
                  )}
                  disabled={nodes.length === 0}
                  onClick={() => handleCopy(size)}
                  aria-label={fullLabel}
                >
                  {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
                  <span className="hidden sm:inline">{label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{fullLabel}</TooltipContent>
            </Tooltip>
          );
        })}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handlePaste}
              aria-label="Paste glyphs from clipboard"
            >
              <ClipboardPaste size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Paste (SVG or glyph IDs)</TooltipContent>
        </Tooltip>
      </div>

      <Separator orientation="vertical" className="h-5 mx-1 shrink-0" />

      {/* Zoom group */}
      <div className="flex items-center gap-0.5 shrink-0" role="group" aria-label="Zoom">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
              aria-label="Zoom out"
            >
              <ZoomOut size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom Out</TooltipContent>
        </Tooltip>

        <Badge variant="outline" className="font-mono text-[10px] px-1.5 py-0.5 min-w-[40px] justify-center">
          {Math.round(zoom * 100)}%
        </Badge>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom(Math.min(4, zoom + 0.25))}
              aria-label="Zoom in"
            >
              <ZoomIn size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom In</TooltipContent>
        </Tooltip>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Destructive actions */}
      <div className="flex items-center gap-0.5 shrink-0" role="group" aria-label="Delete actions">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              disabled={!hasSelection}
              onClick={removeSelected}
              aria-label="Delete selected glyphs"
            >
              <Trash2 size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Selected (Del)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              disabled={nodes.length === 0}
              onClick={clearAll}
              aria-label="Clear all glyphs"
            >
              <Eraser size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear All</TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
}
