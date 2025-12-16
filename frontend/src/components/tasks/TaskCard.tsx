import { useNavigate } from "react-router-dom";
import type { Task } from "../../types";
import { MoveRight } from 'lucide-react';

const priorityColors = {
  LOW: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  HIGH: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  URGENT: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const statusColors = {
  TODO: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  REVIEW: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};


export default function TaskCard({ task }: { task: Task }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/tasks/${task.id}`)}
      className="border rounded-lg p-4 bg-base-200 dark:bg-neutral-focus hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-base-content dark:text-base-100">{task.title}</h3>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{task.description}</p>

      <div className="flex justify-between items-center mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        <div className="flex items-center gap-1 text-primary hover:underline">
            <span>View Details</span>
            <MoveRight size={16} />
        </div>
      </div>
    </div>
  );
}
