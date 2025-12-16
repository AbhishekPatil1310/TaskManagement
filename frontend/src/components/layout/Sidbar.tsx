import { Link } from 'react-router-dom';
import { Home, User, CheckSquare, Calendar, LogOut, Settings, X } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { logout } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const navigate = useNavigate();
  const clearUser = useAuthStore((s) => s.clearUser);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearUser();
      navigate('/login');
    }
  };

  return (
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-base-200 border-r rtl:border-r-0 rtl:border-l dark:bg-neutral-focus dark:border-neutral">
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <CheckSquare className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-semibold text-base-content dark:text-base-100">
            A4
          </h1>
        </Link>
        <button className="lg:hidden" onClick={toggleSidebar}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 text-base-content transition-colors duration-300 transform rounded-md dark:text-base-200 hover:bg-base-300 dark:hover:bg-neutral"
            onClick={toggleSidebar}
          >
            <Home className="w-5 h-5" />
            <span className="mx-4 font-medium">Dashboard</span>
          </Link>

          <Link
            to="/dashboard?view=created"
            className="flex items-center px-4 py-2 mt-5 text-base-content transition-colors duration-300 transform rounded-md dark:text-base-200 hover:bg-base-300 dark:hover:bg-neutral"
            onClick={toggleSidebar}
          >
            <CheckSquare className="w-5 h-5" />
            <span className="mx-4 font-medium">Created Tasks</span>
          </Link>

          <Link
            to="/dashboard?view=overdue"
            className="flex items-center px-4 py-2 mt-5 text-base-content transition-colors duration-300 transform rounded-md dark:text-base-200 hover:bg-base-300 dark:hover:bg-neutral"
            onClick={toggleSidebar}
          >
            <Calendar className="w-5 h-5" />
            <span className="mx-4 font-medium">Overdue Tasks</span>
          </Link>
        </nav>

        <div className="flex items-center px-4 -mx-2">
          <Link to="/profile" className="flex items-center mx-2" onClick={toggleSidebar}>
              <User className="w-6 h-6" />
          </Link>
          <Link to="/settings" className="flex items-center mx-2" onClick={toggleSidebar}>
              <Settings className="w-6 h-6" />
          </Link>
          <button onClick={() => { handleLogout(); toggleSidebar(); }} className="flex items-center mx-2">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </aside>
  );
}
