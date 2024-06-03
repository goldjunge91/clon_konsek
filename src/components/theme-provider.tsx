"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
// import Image from "next/image";
// import * as backroundJpg from "../../public/backround.jpg";

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//     return (
//         <NextThemesProvider {...props}>
//             <div
//                 style={{
//                     position: "relative",
//                     width: "100%",
//                     height: "100vh",
//                     overflow: "hidden",
//                 }}
//             >
//                 <Image
//                     src={backroundJpg.default}
//                     layout="fill"
//                     objectFit="cover"
//                     objectPosition="center"
//                     alt="Background image"
//                 />
//                 {children}
//             </div>
//         </NextThemesProvider>
//     );
// }
