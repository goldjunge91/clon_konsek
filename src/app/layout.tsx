/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
import React from "react";
// import { Inter } from "next/font/google";
import AuthProvider from "@/lib/AuthProvider";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import backround from "../../public/backround.jpg";
// import "./globals.css";
// import "./layout.css";

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
			{/* <body className={inter.className}> */}
			<body
				style={{
					zIndex: -1,
					position: "relative",
					width: "100vw",
					height: "100vh",
				}}>
				<Image
					alt="sky"
					src={backround}
					quality={100}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: -10,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center center",
						objectFit: "cover",
					}}
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
