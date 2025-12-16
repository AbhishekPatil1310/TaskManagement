import { useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Layout from "../components/layout/Layout";
import Skeleton from "../components/ui/Skeleton";
import { updateMe } from "../api/user.api";
import {me} from "../api/auth.api"
import { profileSchema } from "../schemas/profile.schema";
import type { ProfileFormInput } from "../schemas/profile.schema";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";


export default function Profile() {
  const queryClient = useQueryClient();
  const hasHydrated = useRef(false);


  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: me
  });

  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    }
  });

  const form = useForm<ProfileFormInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "" }
  });

  const { reset } = form;

useEffect(() => {
  if (!user) return;
  if (hasHydrated.current) return;

  reset({
    name: user.name,
    email: user.email
  });

  hasHydrated.current = true;
}, [user, reset]);


  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </Layout>
    );
  }

  const onSubmit = async (data: ProfileFormInput) => {
    await mutation.mutateAsync(data);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-base-content dark:text-base-100 mb-6">My Profile</h1>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-base-100 dark:bg-neutral-focus p-8 rounded-lg shadow-md"
        >
          <Input
            label="Email"
            value={user?.email}
            disabled
            className="bg-base-200 dark:bg-neutral"
          />

          <Input
            label="Name"
            {...form.register("name")}
          />
          {form.formState.errors.name && <p className="text-error text-sm">{form.formState.errors.name.message}</p>}

          <Button
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
