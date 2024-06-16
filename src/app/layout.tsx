/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "@/app/styles/global.css";
import AuthProvider from "@/lib/AuthProvider";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import backround from "../../public/backround.jpg";
import "./global.css";
// const inter = Inter({ subsets: ["latin"] });

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
					layout="cover"
					objectFit="cover"
					quality={100}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: -1,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center center",
					}}
				/>
				{/* <body className={"bg-fullscreen"}> */}
				<AuthProvider>
					<Toaster />
					<NextTopLoader />
					<Header />
					<div className="mx-auto">{children}</div>
				</AuthProvider>
			</body>
		</html>
	);
}
