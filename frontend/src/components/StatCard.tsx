import { ArrowUpRight } from "lucide-react";
import { DashboardMetric } from "../types/video";

export function StatCard({ label, value, change }: DashboardMetric) {
  return (
    <div className="panel-muted animate-fade-up p-5 transition duration-300 hover:-translate-y-1 hover:border-white/15">
      <div className="mb-6 flex items-start justify-between">
        <span className="text-sm text-white/60">{label}</span>
        <div className="rounded-full border border-white/10 bg-white/5 p-2 text-white/60">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-display text-3xl font-semibold text-white">{value}</p>
        <p className="text-sm text-emerald-200/90">{change}</p>
      </div>
    </div>
  );
}
