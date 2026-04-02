export enum VideoStatus {
  Draft = "draft",
  Rendering = "rendering",
  Complete = "complete",
}

export interface GameplayAsset {
  title: string;
  assetId: string;
  assetPath: string;
}

export interface VideoItem {
  id: string;
  title: string;
  topic: string;
  description: string;
  status: VideoStatus;
  assetId: string;
  progress: number;
  script: string;
  outputFile: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
}

export interface NewVideoFormValues {
  title: string;
  topic: string;
  assetId: string;
  description: string;
}
