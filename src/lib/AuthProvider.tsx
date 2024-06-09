"use client";

// import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
// import Image from "next/image";
// import * as backroundJpg from "../../public/backround.jpg";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

// export default function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SessionProvider>
//       <ThemeProvider
//         attribute="class"
//         defaultTheme="system"
//         enableSystem
//         disableTransitionOnChange
//       >
//         {children}
//       </ThemeProvider>
//     </SessionProvider>
//   );
// }

// export default function AuthProvider({ children }: SessionProviderProps) {
//   return (
//     <SessionProvider>
//       <div
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//         }}
//       >
//         <Image
//           src={backroundJpg.default}
//           layout="fill"
//           objectFit="cover"
//           objectPosition="center"
//           alt="Background image"
//         />
//       </div>

//       <ThemeProvider defaultTheme="system" enableSystem disableTransitionOnChange>
//         {children}
//       </ThemeProvider>
//     </SessionProvider>
//   );
// }
