import { ArrowRight, Film, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { AssetCard } from "../components/AssetCard";
import { Button } from "../components/Button";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeader } from "../components/SectionHeader";
import { StatCard } from "../components/StatCard";
import { dashboardMetrics } from "../data/mockProjects";
import { useAppState } from "../hooks/useAppState";

export function DashboardPage() {
  const { assets, projects, duplicateProject, deleteProject } = useAppState();
  const openCreateModal = () => window.dispatchEvent(new Event("open-new-video-modal"));

  return (
    <div className="space-y-10">
      <section className="panel relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-brand-500/10 via-transparent to-transparent lg:block" />
        <div className="relative grid gap-8 lg:grid-cols-[1.3fr,0.7fr]">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.36em] text-brand-300">Creator Command Center</p>
            <h1 className="text-gradient font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Build polished short-form video projects with a frontend that already feels like a real product.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
              Design-first workspace for mock video generation flows, gameplay background selection, and creator-ready project tracking. Backend and file integration can plug in later without reworking the UI foundation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={openCreateModal}>
                <Plus className="h-4 w-4" />
                Create New Video
              </Button>
              <Link to="/projects">
                <Button variant="secondary">
                  Explore Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="panel-muted animate-float p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-2xl bg-brand-500/15 p-3 text-brand-200">
                  <Film className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/55">Pipeline health</p>
                  <p className="font-display text-xl font-semibold text-white">3 exports in progress</p>
                </div>
              </div>
              <p className="text-sm leading-6 text-white/60">
                Use mocked status signals today, then swap in backend render jobs later.
              </p>
            </div>
            <div className="panel-muted p-5">
              <p className="text-sm text-white/55">Gameplay source</p>
              <p className="mt-2 font-display text-xl font-semibold text-white">Local asset folder ready</p>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Cards below are placeholders for real footage discovery from your manual asset library.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section>
        <SectionHeader
          eyebrow="Recent Work"
          title="Recent video projects"
          description="Projects stay in local mock state for now, but the shape is designed to map directly to future persisted backend models."
          action={
            <Link to="/projects">
              <Button variant="secondary">View All Projects</Button>
            </Link>
          }
        />
        <div className="grid gap-5 xl:grid-cols-2">
          {projects.slice(0, 4).map((project) => {
            const assetName = assets.find((asset) => asset.id === project.selectedAssetId)?.name ?? "Unknown asset";
            return (
              <ProjectCard
                key={project.id}
                project={project}
                assetName={assetName}
                onDuplicate={() => duplicateProject(project.id)}
                onDelete={() => deleteProject(project.id)}
              />
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Gameplay Assets"
          title="Available gameplay footage"
          description="These entries intentionally read like a real content library while staying frontend-only and mock-driven."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {assets.slice(0, 6).map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </section>
    </div>
  );
}
