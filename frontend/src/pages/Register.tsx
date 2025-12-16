import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type{RegisterInput } from "../schemas/auth.schema";
import { registerSchema } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { CheckSquare } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser, registerLoading, registerError } = useAuth();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterInput) => {
    const success = await registerUser(data);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-neutral">
        <div className="w-full max-w-md p-8 space-y-6 bg-base-100 dark:bg-neutral-focus rounded-lg shadow-md">
            <div className="flex justify-center">
                <CheckSquare className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-center text-base-content dark:text-base-100">
                Create an Account
            </h1>

            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            >
                <Input
                {...form.register("name")}
                placeholder="Name"
                />
                {form.formState.errors.name && <p className="text-error text-sm">{form.formState.errors.name.message}</p>}

                <Input
                {...form.register("email")}
                placeholder="Email"
                />
                {form.formState.errors.email && <p className="text-error text-sm">{form.formState.errors.email.message}</p>}

                <Input
                type="password"
                {...form.register("password")}
                placeholder="Password"
                />
                {form.formState.errors.password && <p className="text-error text-sm">{form.formState.errors.password.message}</p>}
                
                {registerError && <p className="text-error text-sm text-center">{registerError.message}</p>}

                <Button
                disabled={registerLoading}
                className="w-full"
                >
                {registerLoading ? 'Creating account...' : 'Create Account'}
                </Button>
            </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary hover:underline">
                    Sign in
                </Link>
            </p>
        </div>
    </div>
  );
}
