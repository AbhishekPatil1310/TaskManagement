import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginInput } from "../schemas/auth.schema";
import { loginSchema } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { CheckSquare } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginLoading, loginError } = useAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginInput) => {
    const success = await login(data);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-neutral">
      <div className="w-full max-w-md p-8 space-y-6 bg-base-100 dark:bg-neutral-focus rounded-lg shadow-md">
        <div className="flex justify-center">
          <CheckSquare className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-center text-base-content dark:text-base-100">
          Welcome Back
        </h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Input
            {...form.register("email")}
            placeholder="Email"
          />
          {form.formState.errors.email && (
            <p className="text-error text-sm">{form.formState.errors.email.message}</p>
          )}

          <Input
            type="password"
            {...form.register("password")}
            placeholder="Password"
          />
          {form.formState.errors.password && (
            <p className="text-error text-sm">{form.formState.errors.password.message}</p>
          )}
          
          {/* ✅ Fixed error display */}
          {loginError && (
            <p className="text-error text-sm text-center">
              {typeof loginError === 'string' 
                ? loginError 
                : loginError?.message || 'Login failed'
              }
            </p>
          )}

          <Button disabled={loginLoading} className="w-full">
            {loginLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
