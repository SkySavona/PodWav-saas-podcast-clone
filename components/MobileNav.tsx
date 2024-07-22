"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out mt-3"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className=" border-none bg-black-1 [&>button]:mt-2  [&>button]:mr-2 w-64 sm:w-72 md:w-72 [&>button]:text-white-3 [&>button]:hover:text-white-2 transition-color duration-300"
        >
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-1 pb-10 pl-4"
          >
            <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
            <h1 className="text-24 font-extrabold text-white-1 ml-2">PodWav</h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between ">
            <nav className="flex h-full flex-col gap-6 text-white-1">
              {sidebarLinks.map(({ route, label, imgURL }) => {
                const isActive =
                  pathname === route || pathname.startsWith(`${route}/`);

                let href = route;
                if (label === "Profile") {
                  href = user ? `/profile/${user.id}` : "/sign-in";
                }

                return (
                  <SheetClose asChild key={route}>
                    <Link
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
                  </SheetClose>
                );
              })}
            </nav>
            <SignedOut>
              <Button
                asChild
                className="text-16 w-3/4 bg-blue-3  text-white-1 font-extrabold mb-16 ml-5"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                className="text-16 w-3/4 bg-blue-3  text-white-1 font-extrabold mb-16 ml-5"
                onClick={() => signOut(() => router.push("/"))}
              >
                Log Out
              </Button>
            </SignedIn>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
