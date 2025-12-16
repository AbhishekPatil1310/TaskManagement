import Layout from "../components/layout/Layout";
import { useTasks } from "../hooks/useTasks";
import { useSocket } from "../hooks/useSocket";
import TaskList from "../components/tasks/TaskList";
import Skeleton from "../components/ui/Skeleton";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import { Plus, ArrowUpDown } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useSocket();

  const view =
    searchParams.get("view") === "created"
      ? "created"
      : searchParams.get("view") === "overdue"
      ? "overdue"
      : "assigned";

  const status = searchParams.get("status") || undefined;
  const priority = searchParams.get("priority") || undefined;
  const sortBy = (searchParams.get("sortBy") as "dueDate" | null) || undefined;
  const order = (searchParams.get("order") as "asc" | "desc" | null) || undefined;

  const { data, isLoading } = useTasks({
    view,
    status,
    priority,
    sortBy,
    order,
  });

  const handleSortToggle = () => {
    setSearchParams((p) => {
      const currentSortBy = p.get("sortBy");
      const currentOrder = p.get("order");

      if (!currentSortBy || currentSortBy !== "dueDate") {
        p.set("sortBy", "dueDate");
        p.set("order", "asc");
      }
      else if (currentOrder === "asc") {
        p.set("sortBy", "dueDate");
        p.set("order", "desc");
      }
      else {
        p.delete("sortBy");
        p.delete("order");
      }

      return p;
    });
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-base-content dark:text-base-100">
          {view === "created"
            ? "Tasks I Created"
            : view === "overdue"
            ? "Overdue Tasks"
            : "My Tasks"}
        </h1>

        <Button
          onClick={() => navigate("/tasks/new")}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus size={20} />
          Create Task
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Select
          value={status || ""}
          onChange={(e) =>
            setSearchParams((p) => {
              e.target.value ? p.set("status", e.target.value) : p.delete("status");
              return p;
            })
          }
          className="w-full sm:w-auto"
        >
          <option value="">All Status</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </Select>

        <Select
          value={priority || ""}
          onChange={(e) =>
            setSearchParams((p) => {
              e.target.value ? p.set("priority", e.target.value) : p.delete("priority");
              return p;
            })
          }
          className="w-full sm:w-auto"
        >
          <option value="">All Priority</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </Select>

        <Button
          onClick={handleSortToggle}
          variant="ghost"
          className="flex items-center gap-2 text-base-content dark:text-base-200 w-full sm:w-auto"
        >
          <ArrowUpDown size={16} />
          {sortBy === "dueDate" && order === "asc"
            ? "Due Date ↑"
            : sortBy === "dueDate" && order === "desc"
            ? "Due Date ↓"
            : "Sort by Due Date"}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : (
        <TaskList tasks={data || []} />
      )}
    </Layout>
  );
}
