/* eslint-disable */
"use client";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {editTaskAction} from "./actions";
import {useParams} from "next/navigation";
import {Task} from "@/db/schema";
import {toast} from "@/components/ui/use-toast";


const formSchema = z.object({
    name: z.string().min(1).max(50),
    // dsmpassword: z.string(),
    dsm_mail: z.string().email({message: "Invalid email address"}),
    dsm_url: z.string().min(1).max(50),

});

export function EditTaskForm({task}: { task: Task }) {
    const params = useParams();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            // dsmpassword:  "",
            dsm_mail: task.dsm_mail ?? "",
            dsm_url: task.dsm_url ?? "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // @ts-ignore
        await editTaskAction({
            // TODO id: params.taskId as string,
            id: params["taskId"] as string,
            ...values,
        });
        toast({
            title: "Task Updated",
            description: "Your task was successfully updated",
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="form-style">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Kundenname"/>
                            </FormControl>
                            {/* <FormDescription></FormDescription> */}
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dsm_url"
                    render={({field}) => (
                        <FormItem className="form-styles">
                            <FormLabel>Q.Wiki URL</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="https://konsek.de"
                                />
                            </FormControl>
                            <FormDescription>
                                Insert the URL to your Q.Wiki / Document Management System
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dsm_mail"
                    render={({field}) => (
                        <FormItem className="form-styles">
                            <FormLabel>Q.Wiki Usermail adresse</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="name.nachname@mail.de"/>
                            </FormControl>
                            <FormDescription>
                                Email address for accessing the Q.Wiki
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {/* <FormField
          control={form.control}
          name="dsmpassword"
          render={({ field }) => (
            <FormItem className="form-styles">
              <FormLabel>Passwort der Usermail</FormLabel>
              <FormControl>
                <Input {...field} placeholder="placeholder" />
              </FormControl>
              <FormDescription>
              placeholder1
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
