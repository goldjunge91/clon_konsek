// src/app/admin/create-user-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createUserAction } from "./actions";

const formSchema = z.object({
  name: z.string().max(50).nullable().default(""),
  username: z.string().min(1).max(50),
  // email: z.string().email(),
  password: z.string().min(6).max(50),
  role: z.enum(["user", "admin"]),
  // emailVerified: z.date().nullable().default(null),
  image: z.string().nullable().default(null),
  isAdmin: z.boolean().default(false),
});

export function CreateUserForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // name: "",
      username: "",
      // email: "",
      password: "",
      role: "user",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createUserAction(values);
    toast({
      title: "Neuen Benutzer erstellt!",
      description: "Benutzer wurde erfolgreich erstellt!",
    });
    router.refresh(); // Aktualisiere die Seite, um die aktualisierte Benutzerliste anzuzeigen
    // router.push("/admin");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Benutzername" />
              </FormControl>
              <FormDescription>Benutzername zum Login</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="email@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="********" />
              </FormControl>
              <FormDescription>Benutzer Passwort</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <select {...field}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </FormControl>
              <FormDescription>Benutzer Role </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Neuen Benutzer erstellen.</Button>
      </form>
    </Form>
  );
}
