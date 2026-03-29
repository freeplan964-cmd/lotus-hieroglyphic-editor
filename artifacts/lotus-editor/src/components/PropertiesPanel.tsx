import { useEditorStore } from "@/store/editorStore";
import { GLYPH_DATASET } from "@/data/glyphs";
import { FlipHorizontal2, FlipVertical2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function PropertiesPanel() {
  const { nodes, selectedIds, updateTransform } = useEditorStore();
  const selectedNodes = nodes.filter((n) => selectedIds.has(n.instanceId));

  if (selectedNodes.length === 0) {
    return (
      <aside aria-label="Properties panel" className="h-full flex flex-col">
        <div className="px-3 py-3 border-b border-border/60">
          <h2 className="text-[11px] font-bold text-foreground/70 uppercase tracking-widest">
            Properties
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-muted-foreground/50 text-xs text-center leading-relaxed">
            Select a glyph on the canvas to edit its properties
          </p>
        </div>
      </aside>
    );
  }

  const node = selectedNodes[0];
  const glyph = GLYPH_DATASET.find((g) => g.id === node.glyphId);
  const { rotate, scale, flipX, flipY } = node.transform;

  const setRotate = (deg: number) =>
    selectedNodes.forEach((n) => updateTransform(n.instanceId, { rotate: deg }));

  const setScale = (val: number) =>
    selectedNodes.forEach((n) => updateTransform(n.instanceId, { scale: val }));

  const toggleFlipX = () =>
    selectedNodes.forEach((n) =>
      updateTransform(n.instanceId, { flipX: !n.transform.flipX })
    );

  const toggleFlipY = () =>
    selectedNodes.forEach((n) =>
      updateTransform(n.instanceId, { flipY: !n.transform.flipY })
    );

  return (
    <aside aria-label="Properties panel" className="h-full flex flex-col">
      {/* Header */}
      <div className="px-3 py-3 border-b border-border/60 flex items-center justify-between">
        <h2 className="text-[11px] font-bold text-foreground/70 uppercase tracking-widest">
          Properties
        </h2>
        {selectedNodes.length > 1 && (
          <Badge variant="secondary" className="text-[9px] px-1.5 h-4">
            {selectedNodes.length} sel.
          </Badge>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">

          {/* Glyph preview */}
          {glyph && (
            <section aria-label="Selected glyph info">
              <div className="w-16 h-16 mx-auto mb-2 p-2 bg-muted/40 rounded-xl border border-border/50 flex items-center justify-center">
                <svg
                  viewBox={glyph.viewBox}
                  className="w-full h-full"
                  style={{ color: "hsl(var(--primary))" }}
                  aria-hidden
                  dangerouslySetInnerHTML={{ __html: glyph.svgContent }}
                />
              </div>
              <div className="text-center space-y-1">
                <p className="font-bold text-foreground text-sm leading-none">
                  {glyph.id}
                </p>
                <p className="text-muted-foreground text-[11px]">{glyph.label}</p>
                <Badge variant="secondary" className="text-[9px] px-2 h-4">
                  {glyph.category}
                </Badge>
              </div>
            </section>
          )}

          <Separator />

          {/* Rotation */}
          <section aria-label="Rotation controls">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Rotation
            </p>

            {/* Preset buttons */}
            <div className="grid grid-cols-4 gap-1 mb-2">
              {[0, 90, 180, 270].map((deg) => (
                <Button
                  key={deg}
                  variant={rotate === deg ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-7 text-[10px] px-1 font-semibold",
                    rotate === deg && "shadow-sm"
                  )}
                  onClick={() => setRotate(deg)}
                  aria-label={`Set rotation to ${deg} degrees`}
                  aria-pressed={rotate === deg}
                >
                  {deg}°
                </Button>
              ))}
            </div>

            {/* Fine-tune slider */}
            <div className="flex items-center gap-2">
              <Slider
                min={0}
                max={359}
                step={1}
                value={[rotate]}
                onValueChange={([val]) => setRotate(val)}
                className="flex-1"
                aria-label="Rotation angle"
              />
              <span className="text-[10px] font-mono text-foreground/70 w-8 text-right shrink-0">
                {rotate}°
              </span>
            </div>
          </section>

          <Separator />

          {/* Scale */}
          <section aria-label="Scale controls">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Scale
            </p>

            <div className="flex items-center gap-2 mb-2">
              <Slider
                min={0.2}
                max={3}
                step={0.05}
                value={[scale]}
                onValueChange={([val]) => setScale(val)}
                className="flex-1"
                aria-label="Scale factor"
              />
              <span className="text-[10px] font-mono text-foreground/70 w-10 text-right shrink-0">
                {(scale * 100).toFixed(0)}%
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1">
              {[0.5, 1, 1.5].map((s) => (
                <Button
                  key={s}
                  variant={Math.abs(scale - s) < 0.01 ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-[10px] px-1 font-semibold"
                  onClick={() => setScale(s)}
                  aria-label={`Set scale to ${s * 100}%`}
                  aria-pressed={Math.abs(scale - s) < 0.01}
                >
                  {s === 0.5 ? "50%" : s === 1 ? "100%" : "150%"}
                </Button>
              ))}
            </div>
          </section>

          <Separator />

          {/* Flip */}
          <section aria-label="Flip controls">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Flip
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <Button
                variant={flipX ? "default" : "outline"}
                size="sm"
                className="h-8 text-[11px] gap-1.5"
                onClick={toggleFlipX}
                aria-pressed={flipX}
                aria-label="Toggle horizontal flip"
              >
                <FlipHorizontal2 size={13} />
                H‑Flip
              </Button>
              <Button
                variant={flipY ? "default" : "outline"}
                size="sm"
                className="h-8 text-[11px] gap-1.5"
                onClick={toggleFlipY}
                aria-pressed={flipY}
                aria-label="Toggle vertical flip"
              >
                <FlipVertical2 size={13} />
                V‑Flip
              </Button>
            </div>
          </section>

          <Separator />

          {/* Glyph ID info */}
          <section
            aria-label="Glyph identifiers"
            className="rounded-lg bg-muted/40 border border-border/40 p-2.5 space-y-1"
          >
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Identifier
            </p>
            <p className="font-mono text-sm font-bold text-foreground">
              {node.glyphId}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground/60">
              id: {node.instanceId.slice(0, 8)}…
            </p>
          </section>

        </div>
      </ScrollArea>
    </aside>
  );
}
