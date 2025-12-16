import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-base-100 dark:bg-neutral">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
