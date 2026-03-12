export type ProjectStatus = "draft" | "rendering" | "complete";
export type Platform = "TikTok" | "YouTube Shorts" | "Instagram Reels";
export type StoryTone = "Cinematic" | "High Energy" | "Dark Humor" | "Motivational";

export interface GameplayAsset {
  id: string;
  name: string;
  duration: string;
  category: string;
  game: string;
  thumbnailLabel: string;
  resolution: string;
}

export interface VideoProject {
  id: string;
  title: string;
  topic: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  selectedAssetId: string;
  platform: Platform;
  tone: StoryTone;
  duration: string;
  progress: number;
  scriptSummary: string;
  voiceoverStatus: string;
  subtitleStatus: string;
  renderStatus: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
}

export interface NewProjectFormValues {
  topic: string;
  tone: StoryTone;
  platform: Platform;
  duration: string;
  selectedAssetId: string;
}
