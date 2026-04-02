import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { VideoDetailsPage } from "./pages/VideoDetailsPage";
import { VideosPage } from "./pages/VideosPage";
import { AppProvider } from "./hooks/useAppState";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects" element={<VideosPage />} />
          <Route path="/projects/:videoId" element={<VideoDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
