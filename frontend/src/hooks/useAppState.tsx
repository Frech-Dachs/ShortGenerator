import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { mockAssets } from "../data/mockAssets";
import { mockProjects } from "../data/mockProjects";
import { NewProjectFormValues, VideoProject } from "../types/project";

interface AppStateContextValue {
  assets: typeof mockAssets;
  projects: VideoProject[];
  createProject: (values: NewProjectFormValues) => void;
  duplicateProject: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const [projects, setProjects] = useState<VideoProject[]>(mockProjects);

  const createProject = (values: NewProjectFormValues) => {
    const selectedAsset = mockAssets.find((asset) => asset.id === values.selectedAssetId);
    const title = values.topic.trim() || "Untitled Video Project";

    const nextProject: VideoProject = {
      id: `proj-${crypto.randomUUID()}`,
      title,
      topic: values.topic,
      description: `New ${values.platform} short with a ${values.tone.toLowerCase()} tone, prepared from mocked frontend state.`,
      status: "draft",
      createdAt: "Mar 11, 2026",
      selectedAssetId: values.selectedAssetId,
      platform: values.platform,
      tone: values.tone,
      duration: values.duration,
      progress: 8,
      scriptSummary: `Initial concept for "${title}" using ${selectedAsset?.game ?? "selected gameplay"} as the background visual layer.`,
      voiceoverStatus: "Pending generation",
      subtitleStatus: "Not started",
      renderStatus: "Queued locally",
    };

    setProjects((current) => [nextProject, ...current]);
    console.log("Mock project created", nextProject);
  };

  const duplicateProject = (projectId: string) => {
    setProjects((current) => {
      const project = current.find((item) => item.id === projectId);
      if (!project) {
        return current;
      }

      const copy: VideoProject = {
        ...project,
        id: `proj-${crypto.randomUUID()}`,
        title: `${project.title} Copy`,
        createdAt: "Mar 11, 2026",
        status: "draft",
        progress: 12,
      };

      return [copy, ...current];
    });
  };

  const deleteProject = (projectId: string) => {
    setProjects((current) => current.filter((item) => item.id !== projectId));
  };

  const value = useMemo(
    () => ({
      assets: mockAssets,
      projects,
      createProject,
      duplicateProject,
      deleteProject,
    }),
    [projects],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used inside AppProvider");
  }

  return context;
}
