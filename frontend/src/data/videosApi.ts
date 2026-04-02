import { GameplayAsset, NewVideoFormValues, VideoItem, VideoStatus } from "../types/video";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

interface VideoApiResponse {
  id: string;
  title: string;
  topic: string;
  description: string;
  status: VideoStatus;
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

function mapVideo(video: VideoApiResponse): VideoItem {
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

export async function getVideos(): Promise<VideoItem[]> {
  const response = await fetch(`${API_BASE_URL}/videos/`);
  if (!response.ok) {
    throw new Error("Failed to load videos");
  }

  const payload: VideoApiResponse[] = await response.json();
  return payload.map(mapVideo);
}

export async function getVideo(videoId: string): Promise<VideoItem> {
  const response = await fetch(`${API_BASE_URL}/videos/${videoId}`);
  if (!response.ok) {
    throw new Error("Failed to load video");
  }

  const payload: VideoApiResponse = await response.json();
  return mapVideo(payload);
}

export async function createVideo(values: NewVideoFormValues): Promise<VideoItem> {
  const response = await fetch(`${API_BASE_URL}/videos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to create video");
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
