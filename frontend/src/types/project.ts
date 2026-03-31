export enum ProjectStatus {
  Draft = "draft",
  Rendering = "rendering",
  Complete = "complete",
}

export interface GameplayAsset {
  title: string;
  assetId: string;
  assetPath: string;
}

export interface VideoProject {
  id: string;
  title: string;
  topic: string;
  description: string;
  status: ProjectStatus;
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

export interface NewProjectFormValues {
  title: string;
  topic: string;
  assetId: string;
  description: string;
}
