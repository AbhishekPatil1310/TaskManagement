import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Layout from "../components/layout/Layout";
import Skeleton from "../components/ui/Skeleton";
import { updateMe } from "../api/user.api";
import { me } from "../api/auth.api";
import { profileSchema } from "../schemas/profile.schema";
import type { ProfileFormInput } from "../schemas/profile.schema";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Profile() {
  const queryClient = useQueryClient();

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

  // 🔥 GATE RENDER
  if (isLoading || !user) {
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

  const form = useForm<ProfileFormInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email
    }
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: ProfileFormInput) => {
    await mutation.mutateAsync(data);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-8 rounded-lg shadow-md bg-base-100"
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                disabled
                className="bg-base-200"
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
              />
            )}
          />

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
