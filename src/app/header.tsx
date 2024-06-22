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
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { deleteAccountAction } from "./actions";
import { User } from 'lucide-react';
import "./globals.css";

function AccountDropdown() {
	const session = useSession(); // Get session data
	const [open, setOpen] = useState(false);
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
					<Button className="dropdown-button" variant={"link"}>
						<Avatar className="avatar">
							<AvatarImage src={session.data?.user?.image ?? ""} />
							<AvatarFallback><User /></AvatarFallback>
						</Avatar>
						{session.data?.user?.name ?? ""}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="dropdown-menu-content">
					<DropdownMenuItem className="dropdown-menu-item"
						onClick={() =>
							signOut({
								callbackUrl: "/",
							})
						}>
						<LogOutIcon /> Logout
					</DropdownMenuItem>
					<DropdownMenuItem className="dropdown-menu-item"
						onClick={() => {
							setOpen(true);
						}}>
						<DeleteIcon /> Delete Account
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
			<Link href="/">
				<Image
					className="logo"
					src="/logo_konsek.svg" // Direct path to the image
					alt="KONSEK logo"
					width={200}
					height={60}
				/>
			</Link>
			<div className="link-container">
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
						{isAdmin && (
							<Link href="/browse" className="nav-link">
								Browse
							</Link>
						)}
					</>
				)}
			</div>
			<div className="login-container">
				{isLoggedIn && <AccountDropdown />}
				{!isLoggedIn && (
					<Button className="button" onClick={() => signIn()} variant="link">
						<LogInIcon />
						Login
					</Button>
				)}
			</div>
		</header>
	);
}
