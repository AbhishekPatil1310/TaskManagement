import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/auth.api";


type Notification = {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get<Notification[]>("/notifications");
      return res.data;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markReadMutation = useMutation({
    mutationFn: (id: string) =>
      api.put(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });

  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="relative">
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg z-50">
          {notifications.length === 0 && (
            <div className="p-3 text-sm text-gray-500">
              No notifications
            </div>
          )}

          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => {
                if (!n.read) {
                  markReadMutation.mutate(n.id);
                }
              }}
              className={`p-3 text-sm cursor-pointer border-b last:border-b-0 ${
                n.read ? "text-gray-500" : "font-medium bg-gray-50"
              }`}
            >
              {n.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
