import { FileVideo } from "lucide-react";
import { Link } from "react-router-dom";
import { VideoItem } from "../types/video";
import { Button } from "./Button";
import { StatusBadge } from "./StatusBadge";

interface VideoCardProps {
  video: VideoItem;
  assetName: string;
}

export function VideoCard({
  video,
  assetName,
}: VideoCardProps) {
  return (
    <article className="panel-muted group p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">{video.title}</h3>
          <p className="mt-1 text-sm text-white/55">{video.topic}</p>
        </div>
        <StatusBadge status={video.status} />
      </div>

      <p className="mb-5 min-h-12 text-sm leading-6 text-white/70">{video.description}</p>

      <div className="mb-5 grid grid-cols-2 gap-4 text-sm text-white/65">
        <div>
          <p className="text-white/40">Video ID</p>
          <p>{video.id}</p>
        </div>
        <div>
          <p className="text-white/40">Asset</p>
          <p>{assetName}</p>
        </div>
        <div>
          <p className="text-white/40">Script</p>
          <p>{video.script ? "Generated" : "Pending"}</p>
        </div>
        <div>
          <p className="text-white/40">Output</p>
          <p>{video.outputFile || "Pending"}</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/35">
          <span>Progress</span>
          <span>{video.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300"
            style={{ width: `${video.progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link to={`/projects/${video.id}`} className="min-w-[120px] flex-1">
          <Button className="w-full">Open</Button>
        </Link>
        <Button variant="secondary" className="min-w-[120px] flex-1" disabled>
          <FileVideo className="h-4 w-4" />
          Await Backend Actions
        </Button>
      </div>
    </article>
  );
}
