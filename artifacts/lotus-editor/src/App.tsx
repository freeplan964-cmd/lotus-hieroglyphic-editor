import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlyphPalette } from "@/components/GlyphPalette";
import { EditorCanvas } from "@/components/EditorCanvas";
import { Toolbar } from "@/components/Toolbar";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { useEditorStore } from "@/store/editorStore";
import { copyToClipboard, pasteFromClipboard } from "@/services/clipboardService";

const queryClient = new QueryClient();

function Editor() {
  const { nodes, selectedIds, removeSelected, addGlyph, quadratSize } = useEditorStore();

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key === "c") {
        e.preventDefault();
        const selectedNodes = nodes.filter((n) => selectedIds.has(n.instanceId));
        const toCopy = selectedNodes.length > 0 ? selectedNodes : nodes;
        await copyToClipboard(toCopy, "wysiwyg", quadratSize);
      }
      if (mod && e.key === "v") {
        e.preventDefault();
        const parsed = await pasteFromClipboard();
        parsed.forEach((p) => addGlyph(p.glyphId));
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;
        removeSelected();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nodes, selectedIds, removeSelected, addGlyph, quadratSize]);

  return (
    <div className="app-shell h-screen w-screen flex flex-col overflow-hidden" style={{ background: "hsl(var(--background))" }}>
      <div className="toolbar-area border-b border-amber-200/70 bg-white/60 backdrop-blur-sm shadow-sm" style={{ height: "52px", flexShrink: 0 }}>
        <Toolbar />
      </div>

      <div className="main-area flex flex-1 overflow-hidden">
        <aside className="palette-sidebar border-r border-amber-200/60 bg-white/50 backdrop-blur-sm overflow-hidden" style={{ width: "220px", flexShrink: 0 }}>
          <GlyphPalette />
        </aside>

        <main className="editor-main flex-1 overflow-hidden relative" style={{ background: "hsl(var(--background))" }}>
          <div className="canvas-bg h-full w-full overflow-auto">
            <EditorCanvas />
          </div>
        </main>

        <aside className="props-sidebar border-l border-amber-200/60 bg-white/50 backdrop-blur-sm overflow-hidden" style={{ width: "200px", flexShrink: 0 }}>
          <PropertiesPanel />
        </aside>
      </div>

      <div className="status-bar border-t border-amber-200/40 bg-amber-50/40 px-4 py-1 flex items-center gap-4" style={{ height: "28px", flexShrink: 0 }}>
        <span className="text-[11px] text-amber-500/80">
          {nodes.length} glyph{nodes.length !== 1 ? "s" : ""}
        </span>
        {selectedIds.size > 0 && (
          <span className="text-[11px] text-amber-600/80">
            {selectedIds.size} selected
          </span>
        )}
        <span className="ml-auto text-[11px] text-amber-400/60">
          Ctrl+C copy · Ctrl+V paste · Del delete
        </span>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Editor />
    </QueryClientProvider>
  );
}

export default App;
