import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../utils/socket";

export function useSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Task updates
    socket.on("task:updated", ({ taskId, updates }) => {
      queryClient.setQueriesData<any>(
        { queryKey: ["tasks"] },
        (oldData: any) =>
          oldData?.map((task: any) =>
            task.id === taskId ? { ...task, ...updates } : task
          )
      );
    });

    // 🔔 Notifications (CRITICAL FIX)
    socket.on("notification:new", () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });

    return () => {
      socket.off("task:updated");
      socket.off("notification:new");
    };
  }, [queryClient]);
}
