import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../schemas/task.schema";
import type { TaskFormInput } from "../../schemas/task.schema";
import { useTaskForm } from "../../hooks/useTaskForm";
import type { Task } from "../../types";

function toDateInputValue(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

type Props = {
  task?: Task;
  onSuccess?: () => void;
};

export default function TaskForm({ task, onSuccess }: Props) {
  const form = useForm<TaskFormInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      priority: "MEDIUM",
      status: "TODO",
      assignedToId: undefined
    }
  });

  const { reset } = form;
  const mutation = useTaskForm(task?.id);

  // ✅ Single, simple effect: whenever `task` changes, reset form
  useEffect(() => {
    if (!task) return;

    reset({
      title: task.title,
      description: task.description ?? "",
      dueDate: toDateInputValue(task.dueDate),
      priority: task.priority,
      status: task.status,
      assignedToId: task.assignedToId ?? undefined
    });
  }, [task, reset]);

  const onSubmit = async (data: TaskFormInput) => {
    const payload = Object.fromEntries(
      Object.entries({
        ...data,
        dueDate: data.dueDate
          ? new Date(data.dueDate).toISOString()
          : undefined
      }).filter(([_, v]) => v !== undefined && v !== "")
    );

    await mutation.mutateAsync(payload as any);
    onSuccess?.();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg"
    >
      <input
        {...form.register("title")}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />

      <textarea
        {...form.register("description")}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        {...form.register("dueDate")}
        className="w-full border p-2 rounded"
      />

      <select
        {...form.register("priority")}
        className="w-full border p-2 rounded"
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>

      <select
        {...form.register("status")}
        className="w-full border p-2 rounded"
      >
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="REVIEW">Review</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {mutation.isPending
          ? task
            ? "Updating..."
            : "Creating..."
          : task
          ? "Update Task"
          : "Create Task"}
      </button>
    </form>
  );
}
