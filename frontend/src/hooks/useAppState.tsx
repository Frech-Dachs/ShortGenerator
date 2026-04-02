import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createVideo as createVideoRequest,
  getAssets,
  getVideos,
} from "../data/videosApi";
import { GameplayAsset, NewVideoFormValues, VideoItem } from "../types/video";

interface AppStateContextValue {
  assets: GameplayAsset[];
  videos: VideoItem[];
  isLoading: boolean;
  error: string | null;
  createVideo: (values: NewVideoFormValues) => Promise<VideoItem>;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const [assets, setAssets] = useState<GameplayAsset[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true);
        setError(null);

        const [loadedVideos, loadedAssets] = await Promise.all([
          getVideos(),
          getAssets().catch(() => []),
        ]);

        setVideos(loadedVideos);
        setAssets(loadedAssets);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    }

    void loadInitialData();
  }, []);

  const createVideo = async (values: NewVideoFormValues) => {
    const nextVideo = await createVideoRequest(values);
    setVideos((current) => [nextVideo, ...current]);
    return nextVideo;
  };

  const value = useMemo(
    () => ({
      assets,
      videos,
      isLoading,
      error,
      createVideo,
    }),
    [assets, error, isLoading, videos],
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
