"use client";
import React from "react";
import PodcastCard from "@/components/PodcastCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from '@/components/LoaderSpinner';


const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  if(!trendingPodcasts) return <LoaderSpinner />

  return (
    <div className="mt-0 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        {/* <Button className="text-white-1 bg-blue-3">Button</Button> */}

        <div className="podcast_grid">
          {trendingPodcasts?.map(
            ({ _id, podcastTitle, podcastDescription, imageUrl }) => (
              <PodcastCard
                key={_id}
                imgURL={imageUrl as string}
                title={podcastTitle}
                description={podcastDescription} podcastId={0}                // podcastId={_id}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
