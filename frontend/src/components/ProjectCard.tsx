import { Copy, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { VideoProject } from "../types/project";
import { Button } from "./Button";
import { StatusBadge } from "./StatusBadge";

interface ProjectCardProps {
  project: VideoProject;
  assetName: string;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function ProjectCard({
  project,
  assetName,
  onDuplicate,
  onDelete,
}: ProjectCardProps) {
  return (
    <article className="panel-muted group p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
          <p className="mt-1 text-sm text-white/55">{project.topic}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p className="mb-5 min-h-12 text-sm leading-6 text-white/70">{project.description}</p>

      <div className="mb-5 grid grid-cols-2 gap-4 text-sm text-white/65">
        <div>
          <p className="text-white/40">Created</p>
          <p>{project.createdAt}</p>
        </div>
        <div>
          <p className="text-white/40">Gameplay Clip</p>
          <p>{assetName}</p>
        </div>
        <div>
          <p className="text-white/40">Platform</p>
          <p>{project.platform}</p>
        </div>
        <div>
          <p className="text-white/40">Duration</p>
          <p>{project.duration}</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/35">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link to={`/projects/${project.id}`} className="min-w-[120px] flex-1">
          <Button className="w-full">Open</Button>
        </Link>
        <Button variant="secondary" className="min-w-[120px] flex-1" onClick={onDuplicate}>
          <Copy className="h-4 w-4" />
          Duplicate
        </Button>
        <Button variant="ghost" className="min-w-[120px] flex-1 border border-white/10" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </article>
  );
}
