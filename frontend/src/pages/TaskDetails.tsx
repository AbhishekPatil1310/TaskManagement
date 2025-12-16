import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "../components/layout/Layout";
import TaskForm from "../components/tasks/TaskForm";
import { getTaskById, deleteTask } from "../api/task.api";
import Skeleton from "../components/ui/Skeleton";
import Button from "../components/ui/Button";
import { Trash2 } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import type { Task } from "../types";

export default function TaskDetail() {
  const user = useAuthStore((s) => s.user);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isEdit = Boolean(id);

  const {
    data: task,
    isLoading
  } = useQuery<Task>({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id!), // MUST return Promise<Task>
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity, // ✅ v5 replacement
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate("/dashboard");
    }
  });

  const handleDelete = () => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(id);
    }
  };

  const canDelete = isEdit && task?.creatorId === user?.id;

  if (isEdit && isLoading) {
    return (
      <Layout>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Task" : "Create Task"}
          </h1>

          {canDelete && (
            <Button
              variant="accent"
              onClick={handleDelete}
              disabled={deleteTaskMutation.isPending}
            >
              <Trash2 size={18} />
              {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          )}
        </div>

        <div className="p-8 rounded shadow bg-base-100">
          <TaskForm
            key={task?.id ?? "create"}
            task={task}
            onSuccess={() => navigate("/dashboard")}
          />
        </div>
      </div>
    </Layout>
  );
}
