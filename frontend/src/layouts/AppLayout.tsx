import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { NewVideoModal } from "../components/NewVideoModal";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { useModalState } from "../hooks/useModalState";

export function AppLayout() {
  const modal = useModalState();

  useEffect(() => {
    const handler = () => modal.open();
    window.addEventListener("open-new-video-modal", handler);

    return () => {
      window.removeEventListener("open-new-video-modal", handler);
    };
  }, [modal]);

  return (
    <div className="min-h-screen bg-hero-grid text-white">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar onCreateClick={modal.open} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
      <NewVideoModal isOpen={modal.isOpen} onClose={modal.close} />
    </div>
  );
}
