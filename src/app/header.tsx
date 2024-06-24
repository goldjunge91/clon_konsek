/* eslint-disable */
// /src/app/header.tsx
"use client";
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
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { deleteAccountAction } from "./actions";
import { User } from "lucide-react";
import Image from "next/image";

// import DarkIcon from "@/app/saturn_magenta.svg";
// import LightIcon from "@/app/saturn_sw.svg";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will delete your account and all
              data associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account.
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"}>
            <Avatar className="mr-2">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
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
            }
          >
            <LogOutIcon className="mr-2" /> Logout
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon className="mr-2" /> Delete Account
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
    <header className="header">
      <div className="header-content">
        <Link href="/">
          <Image
            className="logo"
            src="/logo_konsek.svg"
            alt="KONSEK logo"
            width={200}
            height={60}
          />
        </Link>
        <nav className="flex gap-8">
          {isLoggedIn && (
            <>
              <Link className="nav-link" href="/your-tasks">
                Your Tasks
              </Link>
              {isAdmin && (
                <Link className="nav-link" href="/admin">
                  Adminpanel
                </Link>
              )}
              {isAdmin && (
                <Link className="nav-link" href="/browse">
                  Browse
                </Link>
              )}
            </>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant="link" className="header-button">
              <LogInIcon className="mr-2" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
