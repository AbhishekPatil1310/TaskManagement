import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/layout/Layout";
import TaskForm from "../components/tasks/TaskForm";
import { getTaskById } from "../api/task.api";
import Skeleton from "../components/ui/Skeleton";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id!),
    enabled: isEdit
  });

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
        <h1 className="text-3xl font-bold text-base-content dark:text-base-100 mb-6">
          {isEdit ? "Edit Task" : "Create Task"}
        </h1>

        <div className="bg-base-100 dark:bg-neutral-focus p-8 rounded-lg shadow-md">
          <TaskForm
            task={task}
            onSuccess={() => navigate("/dashboard")}
          />
        </div>
      </div>
    </Layout>
  );
}
