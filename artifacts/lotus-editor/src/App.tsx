import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlyphPalette } from "@/components/GlyphPalette";
import { EditorCanvas } from "@/components/EditorCanvas";
import { Toolbar } from "@/components/Toolbar";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { useEditorStore } from "@/store/editorStore";
import { copyToClipboard, pasteFromClipboard } from "@/services/clipboardService";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PanelLeft, PanelRight } from "lucide-react";

const queryClient = new QueryClient();

function Editor() {
  const { nodes, selectedIds, removeSelected, addGlyph, quadratSize } =
    useEditorStore();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [propsOpen, setPropsOpen] = useState(false);

  /* Keyboard shortcuts */
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key === "c") {
        e.preventDefault();
        const sel = nodes.filter((n) => selectedIds.has(n.instanceId));
        await copyToClipboard(sel.length > 0 ? sel : nodes, "wysiwyg", quadratSize);
      }
      if (mod && e.key === "v") {
        e.preventDefault();
        const parsed = await pasteFromClipboard();
        parsed.forEach((p) => addGlyph(p.glyphId));
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        removeSelected();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nodes, selectedIds, removeSelected, addGlyph, quadratSize]);

  return (
    <div className="app-shell h-screen w-screen flex flex-col overflow-hidden bg-background">

      {/* ── Toolbar ──────────────────────────────────────────────────── */}
      <header
        className="border-b border-border/70 bg-card/60 backdrop-blur-sm shadow-xs"
        style={{ height: 48, flexShrink: 0 }}
        role="banner"
      >
        <div className="flex items-center h-full gap-1 px-1">
          {/* Mobile: palette trigger */}
          <Sheet open={paletteOpen} onOpenChange={setPaletteOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 md:hidden shrink-0"
                aria-label="Open glyph palette"
              >
                <PanelLeft size={16} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Glyph Palette</SheetTitle>
              </SheetHeader>
              <div className="h-full">
                <GlyphPalette />
              </div>
            </SheetContent>
          </Sheet>

          {/* Main toolbar (scrollable on mobile) */}
          <div className="flex-1 overflow-x-auto">
            <Toolbar />
          </div>

          {/* Mobile: properties trigger */}
          <Sheet open={propsOpen} onOpenChange={setPropsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 md:hidden shrink-0 relative"
                aria-label="Open properties panel"
              >
                <PanelRight size={16} />
                {selectedIds.size > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Glyph Properties</SheetTitle>
              </SheetHeader>
              <div className="h-full">
                <PropertiesPanel />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── Main layout ──────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden" role="main">

        {/* Palette sidebar — desktop only */}
        <aside
          className="hidden md:flex flex-col border-r border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden"
          style={{ width: 212, flexShrink: 0 }}
          aria-label="Glyph palette"
        >
          <GlyphPalette />
        </aside>

        {/* Canvas */}
        <section
          className="flex-1 overflow-hidden relative canvas-bg"
          aria-label="Composition canvas"
        >
          <EditorCanvas />
        </section>

        {/* Properties sidebar — desktop only */}
        <aside
          className="hidden md:flex flex-col border-l border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden"
          style={{ width: 196, flexShrink: 0 }}
          aria-label="Glyph properties"
        >
          <PropertiesPanel />
        </aside>
      </div>

      {/* ── Status bar ───────────────────────────────────────────────── */}
      <footer
        className="border-t border-border/40 bg-muted/30 px-3 flex items-center gap-3"
        style={{ height: 26, flexShrink: 0 }}
        role="status"
        aria-live="polite"
        aria-label="Editor status"
      >
        <Badge variant="outline" className="text-[10px] h-4 px-1.5 font-normal">
          {nodes.length} glyph{nodes.length !== 1 ? "s" : ""}
        </Badge>

        {selectedIds.size > 0 && (
          <Badge variant="secondary" className="text-[10px] h-4 px-1.5 font-normal">
            {selectedIds.size} selected
          </Badge>
        )}

        <span className="ml-auto text-[10px] text-muted-foreground/50 hidden sm:block">
          Ctrl+C copy · Ctrl+V paste · Del delete
        </span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={400}>
        <Editor />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
