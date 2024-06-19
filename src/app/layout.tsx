/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
import React from "react";
import AuthProvider from "@/lib/AuthProvider";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import background from "../../public/background.jpg";
import "./globals.css";



export const metadata: Metadata = {
	title: "PdF-Generator",
	description: "An application to automatically generate and download PDFs.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): React.ReactNode {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="body-background">
				<Image
					className="background-image"
					alt="sky"
					src={background}
					quality={100}
				/>
				<AuthProvider>
					<Toaster />
					<NextTopLoader />
					<Header />
					<div>{children}</div>
				</AuthProvider>
			</body>
		</html>
	);
}
