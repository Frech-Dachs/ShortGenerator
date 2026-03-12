import { FolderInput, PlayCircle } from "lucide-react";
import { GameplayAsset } from "../types/project";
import { Button } from "./Button";

export function AssetCard({ asset, compact = false }: { asset: GameplayAsset; compact?: boolean }) {
  return (
    <article className="panel-muted group overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:border-brand-400/30">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-surface-900 text-lg font-display font-semibold text-white shadow-lg shadow-brand-700/20">
          {asset.thumbnailLabel}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-white">{asset.name}</p>
          <p className="text-sm text-white/55">{asset.game}</p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 text-sm text-white/65">
        <div>
          <p className="text-white/40">Duration</p>
          <p>{asset.duration}</p>
        </div>
        <div>
          <p className="text-white/40">Category</p>
          <p>{asset.category}</p>
        </div>
        {!compact && (
          <>
            <div>
              <p className="text-white/40">Resolution</p>
              <p>{asset.resolution}</p>
            </div>
            <div>
              <p className="text-white/40">Source</p>
              <p>Local gameplay folder</p>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1">
          <PlayCircle className="h-4 w-4" />
          Preview
        </Button>
        <Button variant="ghost" className="flex-1 border border-white/10">
          <FolderInput className="h-4 w-4" />
          Select
        </Button>
      </div>
    </article>
  );
}
