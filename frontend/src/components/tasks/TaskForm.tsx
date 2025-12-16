import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../schemas/task.schema";
import type { TaskFormInput } from "../../schemas/task.schema";
import { useTaskForm } from "../../hooks/useTaskForm";
import { useAuthStore } from "../../store/auth.store";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
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
          <Input
            {...field}
            label="Title"
            placeholder="Task title"
          />
        )}
      />

      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm font-medium text-base-content dark:text-base-200">
          Description
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              id="description"
              {...field}
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral border border-gray-300 dark:border-neutral-focus rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Task description"
            />
          )}
        />
      </div>

      <Controller
        name="dueDate"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Due Date"
            type="date"
          />
        )}
      />

      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <Select {...field} label="Priority">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </Select>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select {...field} label="Status">
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="COMPLETED">Completed</option>
          </Select>
        )}
      />
      {canAssign && (
        <Controller
          name="assignedToId"
          control={control}
          render={({ field }) => (
            <Select {...field} label="Assigned To">
              <option value="">
                {usersLoading ? "Loading users..." : "Unassigned"}
              </option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name ?? user.email}
                </option>
              ))}
            </Select>
          )}
        />
      )}


      <Button
        type="submit"
        disabled={mutation.isPending}
        variant="primary"
        className="w-full"
      >
        {mutation.isPending
          ? task
            ? "Updating..."
            : "Creating..."
          : task
            ? "Update Task"
            : "Create Task"}
      </Button>
    </form>
  );
}
