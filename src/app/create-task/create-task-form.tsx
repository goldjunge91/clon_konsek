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
	//   FormDescription,
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
				file?.type === "text/csv" || { message: "Please select a CSV file." } // file?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
		try {
			const formData = new FormData();
			formData.append("dsm_url", values.dsm_url);
			formData.append("dsmpassword", values.dsmpassword);
			formData.append("dsm_mail", values.dsm_mail);
			formData.append("secretId", values.secretId);
			formData.append("zippassword", values.zippassword);
			// formData.append("file", values.file);
			if (values.file) {
				formData.append("file", values.file);
			}
			const { taskId } = await saveDataTask2(formData); // Remove 'values' from the arguments
			toast({
				title: "Task Created",
				description: "Your task was successfully created",
			});
			router.push(`/tasks/${taskId}`);
		} catch (error) {
			console.error("Error creating task:", error);
			toast({
				title: "Error",
				description: "There was an error creating the task",
			});
		}
	}


	return (
		<Form {...form}>
			<form className="form-style" onSubmit={form.handleSubmit(onSubmit)} >
				<FormField
					control={form.control}
					name="dsm_url"
					render={({ field }) => (
						<FormItem >
							<FormLabel className="custom-label">Q.Wiki URL</FormLabel>
							<div
							>
								<FormControl className="{styles['form-container']}" >
									<Input className="custom-input" {...field} placeholder="https://konsek.de" />
								</FormControl>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* DONE */}
				<FormField
					control={form.control}
					name="dsm_mail"
					render={({ field }) => (
						<FormItem >
							<FormLabel className="custom-label">Q.Wiki User Mail-Adress</FormLabel>
							<div>
								<FormControl>
									<Input className="custom-input" {...field} placeholder="ReadOnlyUSerLogin@mail.de" />
								</FormControl>{" "}
							</div>
							{/* <FormDescription>The Q.Wiki User Mail-Adresse</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dsmpassword"
					render={({ field }) => (
						<FormItem>
							<div>
								<FormLabel className="custom-label">Q.Wiki User Mail Password</FormLabel>
							</div>
							<div>
								<FormControl>
									<Input className="custom-input" {...field}
										type="password"
										placeholder="Password to your Read-Only User"
									/>
								</FormControl>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="zippassword"
					render={({ field }) => (
						<FormItem >
							<FormLabel className="custom-label">
								Enter a password to protect the files.
							</FormLabel>
							<div>
								<FormControl>
									<Input className="custom-input" {...field} type="password" placeholder="Zip-Password" />
								</FormControl>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="file" // eslint-disable-next-line @typescript-eslint/no-unused-vars
					render={({ field: { value, onChange, ...fieldProps } }) => {
						return (
							// @typescript-eslint/no-unused-vars
							<FormItem >
								<FormLabel className="custom-label">Only .CSV File</FormLabel>
								<div>
									<FormControl>
										<Input className="custom-datei"
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
											}} />
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						);
					}} />
				<Button className="button"
					type="submit">
					Create a new print file
				</Button>
			</form>
		</Form>
	);
}


//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="form-wrapper">
//         <FormField
//           control={form.control}
//           name="dsm_url"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Q.Wiki URL</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="https://konsek.de" />
//               </FormControl>
//               {/* <FormDescription> */}
//               {/* Bitte hinterlege die URL zum Q.wiki */}
//               {/* </FormDescription> */}
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="dsmpassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>dsmpassword</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="typescript, nextjs, tailwind" />
//               </FormControl>

//               <FormDescription>dsmpassword</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="dsm_mail"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Q.Wiki User Mail</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="ihre@mail.de" />
//               </FormControl>
//               {/* <FormDescription>Ihre Q.Wiki User Mail</FormDescription> */}
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="zippassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>zippassword</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="zippassword" />
//               </FormControl>
//               {/* <FormDescription>
//                 zippassword wenn sie es vergessen oder sich vertippen kann
//                 keiner das
//               </FormDescription> */}
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="file"
//           // eslint-disable-next-line @typescript-eslint/no-unused-vars
//           render={({ field: { value, onChange, ...fieldProps } }) => (
//             // @typescript-eslint/no-unused-vars
//             <FormItem>
//               <FormLabel>Only .CSV File</FormLabel>
//               <FormControl>
//                 <Input
//                   {...fieldProps}
//                   placeholder="file"
//                   type="file"
//                   accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//                   onChange={(event) => {
//                     const file = event.target.files?.[0];
//                     if (event.target.files && event.target.files.length > 0) {
//                       onChange(event.target.files[0]); // Here you store a File object, not a FileList
//                     } else {
//                       onChange(file ?? undefined);
//                     }
//                   }}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit"> Create a new print file</Button>
//       </form>
//     </Form>
//   );
// }
