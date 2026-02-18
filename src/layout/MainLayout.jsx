import { useState, useEffect, useRef } from "react";
import Sidebar from "../shared/Sidebar/Sidebar";
import MainHeader from "../shared/MainHeader/MainHeader";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [pageTransition, setPageTransition] = useState("enter");
  const location = useLocation();
  const mainRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPageTransition("exit");
    const timer = setTimeout(() => {
      setPageTransition("enter");
      if (mainRef.current) mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex h-screen relative overflow-hidden bg-primary-50">
      <div
        onClick={toggleSidebar}
        className={`
          fixed inset-0 z-40 lg:hidden
          transition-all duration-300 ease-in-out
          ${isSidebarOpen
            ? "bg-black/30 backdrop-blur-sm opacity-100 pointer-events-auto"
            : "bg-transparent backdrop-blur-0 opacity-0 pointer-events-none"
          }
        `}
      />

      {/* ── Sidebar ── */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* ── Main Content Area ── */}
      <div className="flex flex-col flex-1 w-full h-screen overflow-hidden transition-all duration-300 ease-out pt-5">
        {/* Header with subtle slide-down entrance */}
        <div className="animate-[slideDown_0.4s_ease-out_both]">
          <MainHeader toggleSidebar={toggleSidebar} />
        </div>

        {/* Page Content with route transition */}
        <main
          ref={mainRef}
          className={`
            p-5 bg-primary-50 flex-1 overflow-auto
            transition-all duration-300 ease-out
            ${pageTransition === "enter"
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-3 scale-[0.99]"
            }
          `}
        >
          <div className="animate-[fadeInUp_0.5s_ease-out_0.1s_both]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ── Floating ambient glow (decorative) ── */}
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse opacity-40" />
      <div className="pointer-events-none fixed -top-24 -left-24 w-72 h-72 rounded-full bg-primary-dark/5 blur-3xl animate-[pulse_4s_ease-in-out_infinite] opacity-30" />
    </div>
  );
};

export default MainLayout;
