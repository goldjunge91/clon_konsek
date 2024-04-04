/* eslint-disable */
// src/app/create-task/create-task-form.tsx
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { saveDataTask2 } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  // description: z.string(),
  // description: z.string().min(1).max(250),
  dsm_url: z.string(),
  // dsm_url: z.string().url({ message: "Invalid url" }),
  // tags: z.string().min(1).max(50),
  // userId: z.string(),
  dsmpassword: z.string(),
  // dsmpassword: z.string().min(1).max(50).refine((value) => value !== '', {
  //   message: "Bitte ein Passwort eingeben",
  // }),
  dsmmail: z.string(),
  // dsmmail: z.string().email({ message: "Invalid email address" }),
  // taskid: z.string(),
  // taskid: z.string().min(1).max(50),
  zippassword: z.string(),
  // zippassword: z.string().min(1).max(50),
  file: z
    .any()
    .optional()
    .refine((file) => file instanceof File, {
      message: "Bitte eine Datei auswählen",
    })
    .refine(
      (file) =>
        file?.type === "text/csv" ||
        file?.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      { message: "Bitte eine CSV oder Excel Datei auswählen" }
    )
    .refine((file) => (file?.size || 0) <= 5000000, {
      message: "größe maximal 5MB.",
    }),
});

export function CreateTaskForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", // Habe ich
      // description: "", // habe ich
      dsm_url: "", // habe ich
      // tags: "", // habe ich
      dsmpassword: "", // habe ich
      dsmmail: "",
      // taskId:  "",
      zippassword: "",
      file: undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    // formData.append("description", values.description);
    formData.append("dsm_url", values.dsm_url);
    formData.append("dsmpassword", values.dsmpassword);
    formData.append("dsmmail", values.dsmmail);
    // formData.append("tags", values.tags);
    // formData.append("taskId", values.taskId);
    formData.append("zippassword", values.zippassword);
    formData.append("file", values.file);
    if (values.file) {
      formData.append("file", values.file);

      const {taskId} = await saveDataTask2(formData); // Remove 'values' from the arguments

      toast({
        title: "Task Created",
        description: "Your task was successfully created",
      });
      router.push(`/tasks/${taskId}`);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="PDF-Placeholder" />
              </FormControl>
              <FormDescription>PDF-Placeholder-Desc</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dsm_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Q.Wiki URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://konsek.de" />
              </FormControl>
              <FormDescription>
                Bitte hinterlege die URL zum Q.wiki
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dsmpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>dsmpassword</FormLabel>
              <FormControl>
                <Input {...field} placeholder="typescript, nextjs, tailwind" />
              </FormControl>

              <FormDescription>dsmpassword</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dsmmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Q.Wiki User Mail</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ihre@mail.de" />
              </FormControl>
              <FormDescription>Ihre Q.Wiki User Mail</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zippassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>zippassword</FormLabel>
              <FormControl>
                <Input {...field} placeholder="zippassword" />
              </FormControl>
              <FormDescription>
                zippassword wenn sie es vergessen oder sich vertippen kann
                keiner das
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>file</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="file"
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (event.target.files && event.target.files.length > 0) {
                      onChange(event.target.files[0]); // Here you store a File object, not a FileList
                    } else {
                      onChange(file ?? undefined);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}