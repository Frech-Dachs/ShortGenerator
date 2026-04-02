import clsx from "clsx";
import { VideoStatus } from "../types/video";

const statusClasses: Record<VideoStatus, string> = {
  draft: "bg-white/[0.08] text-white/80 border-white/10",
  rendering: "bg-amber-400/10 text-amber-200 border-amber-300/20",
  complete: "bg-emerald-400/10 text-emerald-200 border-emerald-300/20",
};

export function StatusBadge({ status }: { status: VideoStatus }) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize tracking-wide",
        statusClasses[status],
      )}
    >
      {status}
    </span>
  );
}
