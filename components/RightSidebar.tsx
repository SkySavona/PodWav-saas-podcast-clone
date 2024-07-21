"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import Carousel from "./Carousel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { getTopUserByPodcastCount } from "@/convex/users";
import { useRouter } from "next/navigation";
import LoaderSpinner from "./LoaderSpinner";

const RightSidebar = () => {
  const { user } = useUser();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);
  const router = useRouter();

  if (!topPodcasters) return <LoaderSpinner />;

  return (
    <section className="right_sidebar text-white-1">
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className="flex gap-4 pb-12">
          <UserButton />
          <div className="flex w-full items-center justify-between">
            <h1 className="text-16 font-semibold text-white-1">
              {user?.firstName} {user?.lastName}
            </h1>
            <Image
              src="/icons/right-arrow.svg"
              width={24}
              height={24}
              alt="arrow-right"
            ></Image>
          </div>
        </Link>
      </SignedIn>

      <section>
        <Header headerTitle="Fans Like You" />
        <Carousel fansLikeDetail={topPodcasters!} />
      </section>

      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Top Podcasters" />
        <div className="flex flex-col gap-6">
          {topPodcasters?.slice(0, 4).map((podcaster) => (
            <div
              key={podcaster._id}
              className="flex cursor-pointer items-center justify-between"
              onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
            >
              <figure className="flex items-center gap-2">
                <Image
                  src={podcaster.imageUrl}
                  alt={podcaster.name}
                  width={44}
                  height={44}
                  className="aspect-square rounded-lg"
                />
                <h2 className="text-14 text-semibold text-white-1">
                  {podcaster.name}
                </h2>
              </figure>
              <div>
                <p className="text-12 font-normal">
                  {podcaster.totalPodcasts} podcast
                  {podcaster.totalPodcasts !== 1 && "s"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RightSidebar;
