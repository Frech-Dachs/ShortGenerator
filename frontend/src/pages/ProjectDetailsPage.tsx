import { CheckCircle2, FileText, Mic2, TimerReset, Video } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useAppState } from "../hooks/useAppState";

const pipelineItems = [
  { label: "Concept", icon: FileText },
  { label: "Voiceover", icon: Mic2 },
  { label: "Subtitles", icon: TimerReset },
  { label: "Render", icon: Video },
  { label: "Export", icon: CheckCircle2 },
];

export function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { projects, assets } = useAppState();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <div className="panel flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl font-semibold text-white">Project not found</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
          This route expects a mock project id from the in-memory frontend state.
        </p>
        <Link to="/projects" className="mt-6">
          <Button>Back to Projects</Button>
        </Link>
      </div>
    );
  }

  const asset = assets.find((item) => item.id === project.selectedAssetId);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Project Details"
        title={project.title}
        description={project.description}
        action={<StatusBadge status={project.status} />}
      />

      <section className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6">
          <div className="panel p-6">
            <h3 className="font-display text-xl font-semibold text-white">Project info</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <InfoItem label="Topic" value={project.topic} />
              <InfoItem label="Created" value={project.createdAt} />
              <InfoItem label="Platform" value={project.platform} />
              <InfoItem label="Duration" value={project.duration} />
              <InfoItem label="Tone" value={project.tone} />
              <InfoItem label="Progress" value={`${project.progress}%`} />
            </div>
          </div>

          <div className="panel p-6">
            <h3 className="font-display text-xl font-semibold text-white">Script / topic summary</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">{project.scriptSummary}</p>
          </div>

          <div className="panel p-6">
            <h3 className="font-display text-xl font-semibold text-white">Production pipeline</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {pipelineItems.map(({ label, icon: Icon }, index) => (
                <div
                  key={label}
                  className={`rounded-3xl border p-4 text-center transition ${
                    project.progress >= (index + 1) * 20
                      ? "border-brand-400/35 bg-brand-500/12 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/50"
                  }`}
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel p-6">
            <h3 className="font-display text-xl font-semibold text-white">Selected gameplay asset</h3>
            <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-semibold">
                  {asset?.thumbnailLabel ?? "NA"}
                </div>
                <div>
                  <p className="font-medium text-white">{asset?.name ?? "Unknown asset"}</p>
                  <p className="text-sm text-white/55">{asset?.game ?? "No game mapped"}</p>
                </div>
              </div>
              <div className="grid gap-3 text-sm text-white/65">
                <InfoItem label="Category" value={asset?.category ?? "N/A"} compact />
                <InfoItem label="Duration" value={asset?.duration ?? "N/A"} compact />
                <InfoItem label="Resolution" value={asset?.resolution ?? "N/A"} compact />
                <InfoItem label="Source" value="Future local gameplay folder integration" compact />
              </div>
            </div>
          </div>

          <div className="panel p-6">
            <h3 className="font-display text-xl font-semibold text-white">Pipeline statuses</h3>
            <div className="mt-5 space-y-4">
              <StatusRow label="Voiceover" value={project.voiceoverStatus} />
              <StatusRow label="Subtitles" value={project.subtitleStatus} />
              <StatusRow label="Render / export" value={project.renderStatus} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoItem({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "flex items-center justify-between" : "rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"}>
      <p className="text-sm text-white/40">{label}</p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
      <p className="text-sm text-white/45">{label}</p>
      <p className="text-right text-sm font-medium text-white">{value}</p>
    </div>
  );
}
