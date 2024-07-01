"use client";
import { SessionProvider } from "next-auth/react";
import React from "react"; // Import React library
export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SessionProvider>{children}</SessionProvider>;
}
