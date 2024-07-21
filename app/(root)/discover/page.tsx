"use client";

import React, { useState } from "react";
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import Searchbar from "@/components/Searchbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const ApplyFilter: React.FC<{ onSortChange: (sort: string) => void }> = ({
  onSortChange,
}) => {
  const [selectedSort, setSelectedSort] = useState("");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = event.target.value;
    setSelectedSort(sort);
    onSortChange(sort);
  };

 

  return (
    <div className="mb-4">
      <select
        value={selectedSort}
        onChange={handleSortChange}
        className="bg-black-1 text-white-1 rounded-md p-2 flex"
      >
        <option value="">Sort by</option>
        <option value="most_viewed">Most Listened</option>
        <option value="least_viewed">Least Listened</option>
      </select>
    </div>
  );
};

const Discover = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const [sortBy, setSortBy] = useState("");
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, {
    search: search || "",
  });

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
  };

  const sortedPodcasts = React.useMemo(() => {
    if (!podcastsData) return [];
    return [...podcastsData].sort((a, b) => {
      if (sortBy === "most_viewed") {
        return (b.views || 0) - (a.views || 0);
      } else if (sortBy === "least_viewed") {
        return (a.views || 0) - (b.views || 0);
      }
      return 0;
    });
  }, [podcastsData, sortBy]);

  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex justify-between items-center">
        <h1 className="text-20 font-bold text-white-1">
          {!search
            ? "Discover Community Podcasts"
            : 'Search Results for "' + search + '"'}
        </h1>
        <ApplyFilter onSortChange={handleSortChange} />
      </div>
      <div className="flex flex-col gap-9 ">
        {podcastsData ? (
          <>
            {sortedPodcasts.length > 0 ? (
              <div className="podcast_grid">
                {sortedPodcasts.map(
                  ({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                    <PodcastCard
                      key={_id}
                      imgUrl={imageUrl as string}
                      title={podcastTitle}
                      description={podcastDescription}
                      podcastId={_id}
                    />
                  )
                )}
              </div>
            ) : (
              <EmptyState title="No results found." />
            )}
          </>
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </div>
  );
};

export default Discover;
