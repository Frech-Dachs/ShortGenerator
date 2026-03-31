import { ArrowRight, Film, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { AssetCard } from "../components/AssetCard";
import { Button } from "../components/Button";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeader } from "../components/SectionHeader";
import { StatCard } from "../components/StatCard";
import { ProjectStatus } from "../types/project";
import { useAppState } from "../hooks/useAppState";

export function DashboardPage() {
  const { assets, projects, isLoading, error } = useAppState();
  const openCreateModal = () => window.dispatchEvent(new Event("open-new-video-modal"));
  const dashboardMetrics = [
    { label: "Total Videos", value: String(projects.length), change: "Loaded from API" },
    {
      label: "Rendering",
      value: String(projects.filter((project) => project.status === ProjectStatus.Rendering).length),
      change: "Backend-owned state",
    },
    {
      label: "Completed",
      value: String(projects.filter((project) => project.status === ProjectStatus.Complete).length),
      change: "Backend-owned state",
    },
    { label: "Gameplay Assets", value: String(assets.length), change: "Loaded from asset endpoint" },
  ];

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
              Design-first workspace for project creation, backend-driven generation, and creator-ready project tracking without relying on seeded frontend content.
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
                This view now reads from API-loaded project state instead of seeded frontend data.
              </p>
            </div>
            <div className="panel-muted p-5">
              <p className="text-sm text-white/55">Backend contract</p>
              <p className="mt-2 font-display text-xl font-semibold text-white">Create form posts only seed values</p>
              <p className="mt-3 text-sm leading-6 text-white/60">
                The backend is responsible for filling generated fields like script, progress, status, and output file.
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
          description="These cards now reflect API-loaded project records rather than seeded frontend placeholders."
          action={
            <Link to="/projects">
              <Button variant="secondary">View All Projects</Button>
            </Link>
          }
        />
        {isLoading ? (
          <div className="panel flex min-h-[240px] items-center justify-center text-sm text-white/55">
            Loading projects...
          </div>
        ) : error ? (
          <div className="panel flex min-h-[240px] items-center justify-center px-6 text-center text-sm text-rose-100">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="panel flex min-h-[240px] items-center justify-center px-6 text-center text-sm text-white/55">
            No projects yet. Use the create flow to send your first project request to the backend.
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {projects.slice(0, 4).map((project) => {
              const assetName = assets.find((asset) => asset.assetId === project.assetId)?.title ?? project.assetId;
              return <ProjectCard key={project.id} project={project} assetName={assetName} />;
            })}
          </div>
        )}
      </section>

      <section>
        <SectionHeader
          eyebrow="Gameplay Assets"
          title="Available gameplay footage"
          description="Asset cards are now driven by the backend contract. Until that endpoint is live, this section stays empty."
        />
        {assets.length === 0 ? (
          <div className="panel flex min-h-[220px] items-center justify-center px-6 text-center text-sm text-white/55">
            No assets returned by the API yet.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {assets.map((asset) => (
              <AssetCard key={asset.assetId} asset={asset} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
