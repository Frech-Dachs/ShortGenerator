import { FolderOpenDot } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeader } from "../components/SectionHeader";
import { useAppState } from "../hooks/useAppState";

export function ProjectsPage() {
  const { projects, assets, isLoading, error } = useAppState();

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Projects"
        title="Video project library"
        description="Project rows now reflect backend-facing models only. Mock inventory and frontend-only actions have been removed."
      />

      {isLoading ? (
        <div className="panel flex min-h-[340px] flex-col items-center justify-center px-6 text-center">
          <h3 className="font-display text-2xl font-semibold text-white">Loading projects</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
            We are fetching the current project list from the API.
          </p>
        </div>
      ) : error ? (
        <div className="panel flex min-h-[340px] flex-col items-center justify-center px-6 text-center">
          <h3 className="font-display text-2xl font-semibold text-white">Could not load projects</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-rose-100">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="panel flex min-h-[340px] flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 rounded-3xl bg-white/5 p-5 text-white/60">
            <FolderOpenDot className="h-10 w-10" />
          </div>
          <h3 className="font-display text-2xl font-semibold text-white">No projects available</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
            Create your first project from the header button and it will appear here as soon as the API responds.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {projects.map((project) => {
            const assetName = assets.find((asset) => asset.assetId === project.assetId)?.title ?? project.assetId;
            return <ProjectCard key={project.id} project={project} assetName={assetName} />;
          })}
        </div>
      )}
    </div>
  );
}
