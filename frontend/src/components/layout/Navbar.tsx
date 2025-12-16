import { useEffect } from "react";
import NotificationBell from "../notifications/NotificationBell";
import { socket } from "../../utils/socket";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from 'lucide-react';

export default function Navbar() {
  const queryClient = useQueryClient();

  // ✅ Mount socket listener ONCE
  useEffect(() => {
    socket.on("notification:new", () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });

    return () => {
      socket.off("notification:new");
    };
  }, [queryClient]);

  return (
    <header className="h-14 flex items-center justify-end px-6 bg-base-100 dark:bg-neutral-focus">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks... but you will get nothing "
            className="pl-10 pr-4 py-2 w-64 border rounded-md bg-base-200 dark:bg-neutral text-base-content dark:text-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <NotificationBell />
      </div>
    </header>
  );
}
