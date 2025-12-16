import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "../components/layout/Layout";
import TaskForm from "../components/tasks/TaskForm";
import { getTaskById, deleteTask } from "../api/task.api";
import Skeleton from "../components/ui/Skeleton";
import Button from "../components/ui/Button";
import { Trash2 } from "lucide-react";
import { useAuthStore } from "../store/auth.store";


export default function TaskDetail() {
  const user = useAuthStore((s) => s.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isEdit = Boolean(id);

  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id!),
    enabled: isEdit,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate("/dashboard");
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(id!);
    }
  };

  // ✅ Show delete button only if user created this task
  const canDelete = isEdit && task?.creatorId === user?.id; // Replace with actual user ID

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
          <h1 className="text-3xl font-bold text-base-content dark:text-base-100">
            {isEdit ? "Edit Task" : "Create Task"}
          </h1>
          {canDelete && (
            <Button
              variant="accent"
              onClick={handleDelete}
              disabled={deleteTaskMutation.isPending}
              className="flex items-center gap-2"
            >
              <Trash2 size={20} />
              {deleteTaskMutation.isPending ? "Deleting..." : "Delete Task"}
            </Button>
          )}
        </div>

        <div className="bg-base-100 dark:bg-neutral-focus p-8 rounded-lg shadow-md">
          <TaskForm task={task} onSuccess={() => navigate("/dashboard")} />
        </div>
      </div>
    </Layout>
  );
}
