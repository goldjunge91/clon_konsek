/* @eslint-ignore */
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
import "../globals.css";


const formSchema = z.object({
	dsm_url: z.string().url({ message: "The URL is in the wrong format: https://" }),
	dsmpassword: z
		.string()
		.min(6)
		.max(50)
		.refine((value) => value !== "", {
			message: "Please enter a password.",
		}),
	dsm_mail: z.string().email({ message: "Enter a valid formatted email address" }),
	secretId: z.string(),
	zippassword: z.string().min(6).max(50),
	file: z
		.any()
		.optional()
		.refine((file) => file instanceof File, {
			message: "Please select a file.",
		})
		.refine(
			(file) =>
				file?.type === "text/csv" ||
				file?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			{ message: "Please select a CSV file." }
		)
		.refine((file) => (file?.size || 0) <= 5000000, {
			message: "Size maximum 5MB.",
		}),
});

export function CreateTaskForm() {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// name: "",
			dsm_url: "", // habe ich
			dsmpassword: "", // habe ich
			dsm_mail: "",
			secretId: "",
			zippassword: "",
			file: undefined,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const formData = new FormData();
		formData.append("dsm_url", values.dsm_url);
		formData.append("dsmpassword", values.dsmpassword);
		formData.append("dsm_mail", values.dsm_mail);
		formData.append("secretId", values.secretId);
		formData.append("zippassword", values.zippassword);
		formData.append("file", values.file);
		if (values.file) {
			formData.append("file", values.file);
			const { taskId } = await saveDataTask2(formData); // Remove 'values' from the arguments
			toast({
				title: "Task Created",
				description: "Your task was successfully created",
			});
			router.push(`/tasks/${taskId}`);
		}
	}

	return (
		<Form {...form}>
			<form className="form" onSubmit={form.handleSubmit(onSubmit)} >
				<FormField
					control={form.control}
					name="dsm_url"
					render={({ field }) => (
						<FormItem className="form-field">
							<FormLabel>Q.Wiki URL</FormLabel>
							<div
								style={{
									width: "30%",
									backgroundColor: "white",
									borderRadius: "10px",
								}}>
								<FormControl className="{styles['form-container']}" >
									<Input {...field} placeholder="https://konsek.de" />
								</FormControl>
							</div>
							<FormDescription>
								Please provide the URL to your Q.wiki Login Like
								"https://konsek.qwikinow.de/"
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="dsm_mail"
					render={({ field }) => (
						<FormItem className="form-field">className="form-field">
							<FormLabel>Q.Wiki User Mail-Adress</FormLabel>
							<div
								style={{
									width: "30%",
									backgroundColor: "white",
									borderRadius: "10px",
								}}>
								<FormControl>
									<Input {...field} placeholder="ReadOnlyUSerLogin@mail.de" />
								</FormControl>{" "}
							</div>
							<FormDescription>The Q.Wiki User Mail-Adresse</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="dsmpassword"
					render={({ field }) => (
						<FormItem className="form-field">
							<div>
								<FormLabel>Q.Wiki User Mail Password</FormLabel>
							</div>
							<div
								style={{
									width: "30%",
									backgroundColor: "white",
									borderRadius: "10px",
								}}>
								<FormControl>
									<Input
										{...field}
										type="password"
										placeholder="Password to your Read-Only User"
									/>
								</FormControl>
							</div>
							<FormDescription>
								Provide the password to the User Email Address that is associated
								with your Q.Wiki account.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="zippassword"
					render={({ field }) => (
						<FormItem className="form-field">
							<FormLabel>
								Enter a password to compress and protect the files from unauthorized
								access{" "}
							</FormLabel>

							<div
								style={{
									width: "30%",
									backgroundColor: "white",
									borderRadius: "10px",
								}}>
								<FormControl>
									<Input {...field} type="password" placeholder="Zip-Password" />
								</FormControl>
							</div>
							<FormDescription>
								Please make sure to remember or enter the correct password. If you
								forget or make a typo, nobody will be able to access the contents.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="file"
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					render={({ field: { value, onChange, ...fieldProps } }) => {
						return (
							// @typescript-eslint/no-unused-vars

							<FormItem className="form-field">
								<FormLabel>Only .CSV File</FormLabel>
								<div
									style={{
										width: "30%",
										backgroundColor: "white",
										borderRadius: "10px",
									}}>
									<FormControl>
										<Input
											{...fieldProps}
											placeholder="CSV file with Q.Wiki URL"
											type="file"
											accept=".csv,"
											onChange={(event) => {
												const file = event.target.files?.[0];
												if (
													event.target.files &&
													event.target.files.length > 0
												) {
													onChange(event.target.files[0]); // Here you store a File object, not a FileList
												} else {
													onChange(file ?? undefined);
												}
											}}
										/>
									</FormControl>
								</div>

								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<Button className="form-button3"
					type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}
