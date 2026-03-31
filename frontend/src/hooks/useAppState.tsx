import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createProject as createProjectRequest,
  getAssets,
  getProjects,
} from "../data/projectsApi";
import { GameplayAsset, NewProjectFormValues, VideoProject } from "../types/project";

interface AppStateContextValue {
  assets: GameplayAsset[];
  projects: VideoProject[];
  isLoading: boolean;
  error: string | null;
  createProject: (values: NewProjectFormValues) => Promise<VideoProject>;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const [assets, setAssets] = useState<GameplayAsset[]>([]);
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true);
        setError(null);

        const [loadedProjects, loadedAssets] = await Promise.all([
          getProjects(),
          getAssets().catch(() => []),
        ]);

        setProjects(loadedProjects);
        setAssets(loadedAssets);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    }

    void loadInitialData();
  }, []);

  const createProject = async (values: NewProjectFormValues) => {
    const nextProject = await createProjectRequest(values);
    setProjects((current) => [nextProject, ...current]);
    return nextProject;
  };

  const value = useMemo(
    () => ({
      assets,
      projects,
      isLoading,
      error,
      createProject,
    }),
    [assets, error, isLoading, projects],
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
