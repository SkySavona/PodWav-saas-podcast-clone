"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "../constants/index.ts";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button.tsx";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6 ">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-1 pb-5 max-lg:justify-center max-lg:flex-col "
        >
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={40}
            height={40}
          ></Image>
          <h1 className="text-white-1 text-24 font-extrabold pl-2 md:pl-0">
            PodWav
          </h1>
        </Link>

        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);

            let href = route;
            if (label === "Profile") {
              href = user ? `/profile/${user.id}` : "/sign-in";
            }
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex gap-3 py-4 max-lg:px-4 justify-start hover:text-white-2 transition-color duration-300 ease-in-out",
                {
                  "bg-nav-focus border-r-4 border-blue-3": isActive,
                }
              )}
            >
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p>{label}</p>
            </Link>
          );
        })}
      </nav>
      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button asChild className="text-16 w-full bg-blue-3 font-extrabold ">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button
            className="text-16 w-full bg-blue-3 font-extrabold"
            onClick={() => signOut(() => router.push("/"))}
          >
            Log Out
          </Button>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
