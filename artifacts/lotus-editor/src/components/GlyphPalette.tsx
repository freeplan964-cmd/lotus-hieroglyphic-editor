import { useState, useMemo } from "react";
import { GLYPH_DATASET, CATEGORIES } from "@/data/glyphs";
import { useEditorStore } from "@/store/editorStore";
import { GlyphDef } from "@/types/editor";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function GlyphPalette() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const addGlyph = useEditorStore((s) => s.addGlyph);

  const filtered = useMemo(() => {
    return GLYPH_DATASET.filter((g) => {
      const matchCat = category === "All" || g.category === category;
      const matchSearch =
        !search ||
        g.id.toLowerCase().includes(search.toLowerCase()) ||
        g.label.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <aside
      aria-label="Glyph palette"
      className="flex flex-col h-full"
    >
      {/* Search */}
      <div className="px-3 py-3 border-b border-border/60">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            type="search"
            placeholder="Search glyphs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-sm bg-background/60"
            aria-label="Search hieroglyphs"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="px-3 py-2 border-b border-border/40">
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex gap-1 pb-1 min-w-max" role="group" aria-label="Filter by category">
            {["All", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={cn(
                  "shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full border transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  category === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-secondary/60 text-secondary-foreground border-border/40 hover:bg-secondary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Count badge */}
      <div className="px-3 py-1.5 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">Glyphs</span>
        <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4">
          {filtered.length}
        </Badge>
      </div>

      <Separator />

      {/* Glyph grid */}
      <ScrollArea className="flex-1">
        <div
          className="grid grid-cols-3 gap-1.5 p-2.5 content-start"
          role="list"
          aria-label="Available hieroglyphs"
        >
          {filtered.map((glyph) => (
            <GlyphCard key={glyph.id} glyph={glyph} onAdd={addGlyph} />
          ))}
          {filtered.length === 0 && (
            <div
              role="status"
              aria-live="polite"
              className="col-span-3 text-center text-muted-foreground/60 text-xs py-8"
            >
              No glyphs found
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

function GlyphCard({
  glyph,
  onAdd,
}: {
  glyph: GlyphDef;
  onAdd: (id: string) => void;
}) {
  return (
    <button
      role="listitem"
      onClick={() => onAdd(glyph.id)}
      title={`${glyph.id} — ${glyph.label}`}
      aria-label={`Add ${glyph.label} (${glyph.id})`}
      className={cn(
        "group flex flex-col items-center gap-1 p-2 rounded-lg border border-border/50",
        "bg-card/50 hover:bg-accent/30 hover:border-primary/40",
        "transition-all duration-150 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "active:scale-95"
      )}
    >
      <div className="w-full aspect-square flex items-center justify-center p-0.5">
        <svg
          viewBox={glyph.viewBox}
          className="w-full h-full"
          style={{ color: "hsl(var(--primary))" }}
          aria-hidden
          dangerouslySetInnerHTML={{ __html: glyph.svgContent }}
        />
      </div>
      <span className="text-[10px] font-bold text-foreground/80 leading-none">
        {glyph.id}
      </span>
      <span className="text-[9px] text-muted-foreground leading-none text-center line-clamp-1 w-full">
        {glyph.label}
      </span>
    </button>
  );
}
