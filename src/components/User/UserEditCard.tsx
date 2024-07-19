// src/components/User/UserEditCard.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { deleteUserAction } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// import bcryptjs from "bcryptjs";

import { User } from '@/db/schema';
const editUserSchema = z.object({
	username: z.string().min(1).max(50),
	password: z.string().min(6).max(50),
});

interface UserCardProps {
	user: User;
	onEdit: (user: User) => void;
	onDelete: (userId: string) => void;
}

export function UserEditCard({ user, onEdit, onDelete }: UserCardProps) {
	const [isEditing, setIsEditing] = useState(false);
	const form = useForm<z.infer<typeof editUserSchema>>({
		resolver: zodResolver(editUserSchema),
		defaultValues: {
			username: user.username || '',
			password: '',
		},
	});
	const router = useRouter();

	async function onSubmit(data: z.infer<typeof editUserSchema>) {
		// console.log('Form data:', data);
		const saltRounds = 10;
		const hashedPassword = data.password
			? await bcrypt.hash(data.password, saltRounds)
			: user.password;
		const updatedUser = {
			...user,
			username: data.username,
			password: hashedPassword,
		};
		// console.log('Updated user:', updatedUser);
		onEdit(updatedUser);
		setIsEditing(false);
	}

	async function handleDelete() {
		await deleteUserAction(user.id);
		onDelete(user.id);
		router.refresh();
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{user.name}</CardTitle>
			</CardHeader>
			<CardContent>
				{isEditing ? (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<div className="flex justify-end space-x-2">
								<Button type="submit">Save</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsEditing(false)}
								>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				) : (
					<div className="space-y-2">
						<p>Username: {user.username}</p>
						{/* <p>Email: {user.email}</p> */}
						<p>Role: {user.role}</p>
						<div className="flex justify-end space-x-2">
							<Button onClick={() => setIsEditing(true)}>
								Edit
							</Button>
							<Button
								variant="destructive"
								onClick={handleDelete}
							>
								Delete
							</Button>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

// // src/components/User/UserEditCard.tsx
// import { User } from "@/db/schema";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { deleteUserAction } from "@/app/admin/actions";
// import { useRouter } from "next/navigation";
// // import bcryptjs from "bcryptjs";

// import bcrypt from "bcryptjs";

// const editUserSchema = z.object({
//   username: z.string().min(1).max(50),
//   password: z.string().min(6).max(50),
// });

// interface UserCardProps {
//   user: User;
//   onEdit: (user: User) => void;
//   onDelete: (userId: string) => void;
// }

// export function UserEditCard({ user, onEdit, onDelete }: UserCardProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const form = useForm<z.infer<typeof editUserSchema>>({
//     resolver: zodResolver(editUserSchema),
//     defaultValues: {
//       username: user.username || "",
//       password: "",
//     },
//   });
//   const router = useRouter();

//   async function onSubmit(data: z.infer<typeof editUserSchema>) {
//     console.log("Form data:", data);
//     const saltRounds = 10;
//     const hashedPassword = data.password
//       ? await bcrypt.hash(data.password, saltRounds)
//       : user.password;
//     const updatedUser = {
//       ...user,
//       username: data.username,
//       password: hashedPassword,
//     };
//     console.log("Updated user:", updatedUser);
//     onEdit(updatedUser);
//     setIsEditing(false);
//   }

//   async function handleDelete() {
//     await deleteUserAction(user.id);
//     onDelete(user.id);
//     router.refresh();
//   }

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>{user.name}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {isEditing ? (
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="username"
//                 render={({ field }) => (
//                   <FormItem className="form-styles">
//                     <FormLabel>Username</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem className="form-styles">
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input type="password" {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <div className="flex justify-end space-x-2">
//                 <Button type="submit">Save</Button>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         ) : (
//           <div className="space-y-2">
//             <p>Username: {user.username}</p>
//             {/* <p>Email: {user.email}</p> */}
//             <p>Role: {user.role}</p>
//             <div className="flex justify-end space-x-2">
//               <Button onClick={() => setIsEditing(true)}>Edit</Button>
//               <Button variant="destructive" onClick={handleDelete}>
//                 Delete
//               </Button>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
