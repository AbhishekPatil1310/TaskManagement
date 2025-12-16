import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TaskFormInput } from "../../schemas/task.schema";
import { taskSchema } from "../../schemas/task.schema";
import { useTaskForm } from "../../hooks/useTaskForm";
import type { Task } from "../../types";
import { useUsers } from "../../hooks/useUser";
import { useAuthStore } from "../../store/auth.store";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

function toDateInputValue(value?: string) {
    if (!value) return "";
    const date = new Date(value);
    return isNaN(date.getTime())
        ? ""
        : date.toISOString().slice(0, 10);
}

type Props = {
    task?: Task;
    onSuccess?: () => void;
};

export default function TaskForm({ task, onSuccess }: Props) {
    const currentUser = useAuthStore((s) => s.user);
    const canAssign =
        !task || task.creatorId === currentUser?.id;

    const { data: users, isLoading: usersLoading } = useUsers();

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

        await mutation.mutateAsync(payload);
        onSuccess?.();
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <Input
                label="Title"
                {...form.register("title")}
                placeholder="e.g. Design new landing page"
            />
            {form.formState.errors.title && <p className="text-error text-sm">{form.formState.errors.title.message}</p>}

            <div>
                <label className="block text-sm font-medium text-base-content dark:text-base-200">Description</label>
                <textarea
                    {...form.register("description")}
                    placeholder="Add a more detailed description..."
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral border border-gray-300 dark:border-neutral-focus rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
            {form.formState.errors.description && <p className="text-error text-sm">{form.formState.errors.description.message}</p>}

            <Input
                label="Due Date"
                type="date"
                {...form.register("dueDate")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                    label="Priority"
                    {...form.register("priority")}
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                </Select>

                <Select
                    label="Status"
                    {...form.register("status")}
                >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="REVIEW">Review</option>
                    <option value="COMPLETED">Completed</option>
                </Select>
            </div>
            
            {canAssign && (
                <Select
                    label="Assign To"
                    {...form.register("assignedToId")}
                    disabled={usersLoading}
                >
                    <option value="">Unassigned</option>
                    {users?.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                        </option>
                    ))}
                </Select>
            )}

            <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full"
            >
                {mutation.isPending ? (task ? 'Updating...' : 'Creating...') : (task ? "Update Task" : "Create Task")}
            </Button>
        </form>
    );
}
