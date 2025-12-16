// ===== User =====
export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

// ===== Task =====
export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "REVIEW"
  | "COMPLETED";

export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "URGENT";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;

  creatorId: string;
  assignedToId?: string | null;

  createdAt: string;
  updatedAt: string;
};

// ===== Notification =====
export type Notification = {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
};


export type Filters = {
  view?: "assigned" | "created" | "overdue";
  status?: string;
  priority?: string;
  sortBy?: "dueDate";
  order?: "asc" | "desc";
};
