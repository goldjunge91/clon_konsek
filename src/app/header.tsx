/* eslint-disable */ // Disable ESLint for this file
// /src/app/header.tsx // Path to the header.tsx file in the app directory
"use client"; // Use the 'use client' directive for client-side code

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Import AlertDialog components from the UI library
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components from the UI library
import { Button } from "@/components/ui/button"; // Import Button component from the UI library
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import DropdownMenu components from the UI library

import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react"; // Import icons from lucide-react
import { signIn, signOut, useSession } from "next-auth/react"; // Import authentication hooks from next-auth/react
import Link from "next/link"; // Import Link component from next/link
import Image from "next/image"; // Import Image component from next/image
import { useState } from "react"; // Import useState hook from react
import { deleteAccountAction } from "./actions"; // Import deleteAccountAction function from actions
// import "./globals.css";

function AccountDropdown() {
	const session = useSession(); // Get session data
	const [open, setOpen] = useState(false); // State for controlling the AlertDialog
	return (
		<>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. It will delete your account and all data
							associated with it.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={async () => {
								await deleteAccountAction();
								signOut({ callbackUrl: "/" });
							}}>
							Yes, delete my account.
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"link"} className="zf1">
						<Avatar className="avatar">
							<AvatarImage src={session.data?.user?.image ?? ""} />
							{/* <AvatarImage src={} /> */}
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						{session.data?.user?.name ?? ""}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
						onClick={() =>
							signOut({
								callbackUrl: "/",
							})
						}>
						<LogOutIcon className="icon" /> Logout
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							setOpen(true);
						}}>
						<DeleteIcon className="icon" /> Delete Account
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}

export function Header() {
	const session = useSession();
	const isLoggedIn = !!session.data;
	const isAdmin = session.data?.user?.role === "admin";
	return (
		<header className="navbar">
			<div >
				<Link href="/" >
					<Image className="logo"
						src="/logo_konsek.svg" // Direct path to the image
						alt="KONSEK logo"
						width={200}
						height={60}
					/>
				</Link>
			</div>

			<div className="links">
				{isLoggedIn && (
					<>
						<Link href="/your-tasks" className="nav-link">
							Your Tasks
						</Link>
						{isAdmin && (
							<Link href="/admin" className="nav-link">
								Adminpanel
							</Link>
						)}
						<Link href="/browse" className="nav-link">
							Browse
						</Link>
					</>
				)}
			</div>
			<div className="zf1">
				{isLoggedIn && <AccountDropdown />}
				{!isLoggedIn && (
					<Button onClick={() => signIn()} variant="link">
						<LogInIcon className="icon" />
						Login
					</Button>
				)}
			</div>
		</header>
	);
}
