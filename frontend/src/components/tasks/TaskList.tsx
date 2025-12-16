import TaskCard from "./TaskCard";
import type { Task } from "../../types";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  if (!tasks.length) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No tasks found</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Create a new task to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
