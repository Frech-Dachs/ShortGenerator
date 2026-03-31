import { GameplayAsset, NewProjectFormValues, ProjectStatus, VideoProject } from "../types/project";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

interface VideoApiResponse {
  id: string;
  title: string;
  topic: string;
  description: string;
  status: ProjectStatus;
  assetId: string;
  progress: number;
  script: string;
  output_file: string;
}

interface AssetApiResponse {
  title: string;
  assetId: string;
  assetPath: string;
}

function mapVideo(video: VideoApiResponse): VideoProject {
  return {
    id: video.id,
    title: video.title,
    topic: video.topic,
    description: video.description,
    status: video.status,
    assetId: video.assetId,
    progress: video.progress,
    script: video.script,
    outputFile: video.output_file,
  };
}

export async function getProjects(): Promise<VideoProject[]> {
  const response = await fetch(`${API_BASE_URL}/videos/`);
  if (!response.ok) {
    throw new Error("Failed to load projects");
  }

  const payload: VideoApiResponse[] = await response.json();
  return payload.map(mapVideo);
}

export async function getProject(projectId: string): Promise<VideoProject> {
  const response = await fetch(`${API_BASE_URL}/videos/${projectId}`);
  if (!response.ok) {
    throw new Error("Failed to load project");
  }

  const payload: VideoApiResponse = await response.json();
  return mapVideo(payload);
}

export async function createProject(values: NewProjectFormValues): Promise<VideoProject> {
  const response = await fetch(`${API_BASE_URL}/videos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  const payload: VideoApiResponse = await response.json();
  return mapVideo(payload);
}

export async function getAssets(): Promise<GameplayAsset[]> {
  const response = await fetch(`${API_BASE_URL}/assets/`);
  if (!response.ok) {
    throw new Error("Failed to load assets");
  }

  return (await response.json()) as AssetApiResponse[];
}
