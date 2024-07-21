"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

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
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <nav className="flex h-full flex-col gap-6 text-white-1">
              {sidebarLinks.map(({ route, label, imgURL }) => {
                const isActive =
                  pathname === route || pathname.startsWith(`${route}/`);

                return (
                  <SheetClose asChild key={route}>
                    <Link
                      key={label}
                      href={route}
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
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
