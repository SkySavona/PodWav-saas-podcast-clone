"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "../constants/index.ts";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button.tsx";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();


  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center"
        >
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={50}
            height={50}
          ></Image>
          <h1 className="text-white text-24 font-extrabold max-lg:hidden">
            PodWav
          </h1>
        </Link>

        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);

          return (
            <Link
              key={label}
              href={route}
              className={cn(
                "flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {
                  'bg-nav-focus border-r-4 border-blue-3': isActive,
                }
              )}
            >
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p>{label}</p>
            </Link>
          );
        })}
      </nav>
      <SignedOut >
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button asChild className="text-16 w-full bg-blue-3 font-extrabold " >
            <Link href="/sign-in">Sign In
            
            </Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn >
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button asChild className="text-16 w-full bg-blue-3 font-extrabold "onClick={() => signOut(() => router.push('/'))} >
          Log Out
            
          </Button>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
