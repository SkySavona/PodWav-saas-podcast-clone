import React from "react";
import { Button } from "@/components/ui/button";
import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";

const Home = () => {
  return (
    <div className="mt-0 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <Button className="text-white-1 bg-blue-3">Button</Button>
       <div className="podcast_grid">
       
        {podcastData.map(({ id, title, description, imgURL }) => (
          <PodcastCard
            key={id}
            imgURL={imgURL}
            title={title}
            description={description}
            podcastId={id}
          />
        ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
