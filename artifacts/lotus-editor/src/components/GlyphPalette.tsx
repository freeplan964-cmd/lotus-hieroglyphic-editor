import { useState, useMemo } from "react";
import { GLYPH_DATASET, CATEGORIES } from "@/data/glyphs";
import { useEditorStore } from "@/store/editorStore";
import { GlyphDef } from "@/types/editor";
import { Search } from "lucide-react";

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
    <div className="palette-panel flex flex-col h-full">
      <div className="palette-header px-4 py-3 border-b border-amber-200/60">
        <div className="flex items-center gap-2 bg-amber-50/80 border border-amber-200 rounded-lg px-3 py-2">
          <Search size={14} className="text-amber-600/70" />
          <input
            type="text"
            placeholder="Search glyphs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-amber-900 placeholder:text-amber-400 outline-none"
          />
        </div>
      </div>

      <div className="category-tabs flex gap-1 px-3 py-2 border-b border-amber-200/40 flex-wrap">
        {["All", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`category-tab text-xs px-2.5 py-1 rounded-full transition-all duration-200 font-medium ${
              category === cat
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-amber-100/60 text-amber-700 hover:bg-amber-200/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="glyph-grid flex-1 overflow-y-auto p-3 grid grid-cols-3 gap-2 content-start">
        {filtered.map((glyph) => (
          <GlyphCard key={glyph.id} glyph={glyph} onAdd={addGlyph} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center text-amber-400/70 text-sm py-8">
            No glyphs found
          </div>
        )}
      </div>
    </div>
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
      onClick={() => onAdd(glyph.id)}
      title={`${glyph.id} — ${glyph.label}`}
      className="glyph-card group flex flex-col items-center gap-1 p-2 rounded-xl border border-amber-200/60 bg-amber-50/40 hover:bg-amber-100/80 hover:border-amber-400/60 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="glyph-preview w-full aspect-square flex items-center justify-center">
        <svg
          viewBox={glyph.viewBox}
          className="w-full h-full"
          style={{ color: "#92400e" }}
          dangerouslySetInnerHTML={{ __html: glyph.svgContent }}
        />
      </div>
      <span className="text-[10px] font-bold text-amber-700 leading-none">
        {glyph.id}
      </span>
      <span className="text-[9px] text-amber-500/80 leading-none text-center line-clamp-1">
        {glyph.label}
      </span>
    </button>
  );
}
