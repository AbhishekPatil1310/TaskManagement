import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../schemas/task.schema";
import type { TaskFormInput } from "../../schemas/task.schema";
import { useTaskForm } from "../../hooks/useTaskForm";
import { useAuthStore } from "../../store/auth.store";
import { useUsers } from "../../hooks/useUser";
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
  const currentUser = useAuthStore((s) => s.user);
  const canAssign =
    !task || task.creatorId === currentUser?.id;
  const { data: users = [], isLoading: usersLoading } = useUsers();

  const mutation = useTaskForm();

  const form = useForm<TaskFormInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
        title: task.title,
        description: task.description ?? "",
        dueDate: toDateInputValue(task.dueDate),
        priority: task.priority,
        status: task.status,
        assignedToId: task.assignedToId ?? undefined
      }
      : {
        title: "",
        description: "",
        dueDate: "",
        priority: "MEDIUM",
        status: "TODO",
        assignedToId: undefined
      }
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: TaskFormInput) => {
    const payload = {
      ...data,
      dueDate: data.dueDate
        ? new Date(data.dueDate).toISOString()
        : undefined
    };

    await mutation.mutateAsync({
      taskId: task?.id,
      data: payload
    });

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            className="w-full border p-2 rounded"
            placeholder="Title"
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            className="w-full border p-2 rounded"
            placeholder="Description"
          />
        )}
      />

      <Controller
        name="dueDate"
        control={control}
        render={({ field }) => (
          <input
            type="date"
            {...field}
            className="w-full border p-2 rounded"
          />
        )}
      />

      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <select {...field} className="w-full border p-2 rounded">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <select {...field} className="w-full border p-2 rounded">
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="COMPLETED">Completed</option>
          </select>
        )}
      />
      {canAssign && (
        <Controller
          name="assignedToId"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border p-2 rounded">
              <option value="">
                {usersLoading ? "Loading users..." : "Unassigned"}
              </option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name ?? user.email}
                </option>
              ))}
            </select>
          )}
        />
      )}


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
