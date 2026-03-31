import { Bell, Menu, Plus, Search } from "lucide-react";
import { Button } from "./Button";

interface TopbarProps {
  onCreateClick: () => void;
}

export function Topbar({ onCreateClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-surface-900/55 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/70 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/45 md:flex">
            <Search className="h-4 w-4" />
            <span>Search projects and assets...</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/70 transition hover:bg-white/10 hover:text-white">
            <Bell className="h-5 w-5" />
          </button>
          <Button onClick={onCreateClick}>
            <Plus className="h-4 w-4" />
            Create New Video
          </Button>
        </div>
      </div>
    </header>
  );
}
