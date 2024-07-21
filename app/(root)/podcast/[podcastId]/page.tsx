"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import EmptyState from "@/components/EmptyState";
import { useUser } from "@clerk/nextjs";

const PodcastDetails = ({
  params: { podcastId },
}: {
  params: { podcastId: Id<"podcasts"> };
}) => {
  const { user } = useUser();
  const podcast = useQuery(api.podcasts.getPodcastById, { podcastId });
  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, {
    podcastId,
  });
  const updateViews = useMutation(api.podcasts.updatePodcastViews);

  const isOwner = user?.id === podcast?.authorId;
  const viewUpdated = useRef(false);

  useEffect(() => {
    if (podcast && user && !isOwner && !viewUpdated.current) {
      updateViews({ podcastId });
      viewUpdated.current = true;
    }
  }, [podcast, user, isOwner, podcastId, updateViews]);

  if (!similarPodcasts || !podcast) return <LoaderSpinner />;

  return (
    <section className="flex flex-col w-full">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          <h2 className="text-16 font-bold pt-2 text-white-1">
            {podcast?.views}
          </h2>
        </figure>
      </header>

      <PodcastDetailPlayer
        isOwner={isOwner}
        podcastId={podcast._id}
        audioUrl={podcast.audioUrl || ""}
        podcastTitle={podcast.podcastTitle}
        author={podcast.author}
        imageUrl={podcast.imageUrl || ""}
        authorImageUrl={podcast.authorImageUrl || ""}
        authorId={podcast.authorId}
        imageStorageId={podcast.imageStorageId ?? ("" as Id<"_storage">)}
        audioStorageId={podcast.audioStorageId ?? ("" as Id<"_storage">)}
      />

      <p className="text-16 pb-8 pt-[45px] font-medium max-md:text-center text-white-2">
        {podcast?.podcastDescription}
      </p>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.voicePrompt}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Thumbnail Prompt</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.imagePrompt}
          </p>
        </div>
      </div>

      <section className="mt-8 flex flex-col placeholder:gap-5">
        <h1 className="text-20 font-bold text-white-1 pb-5">
          Similar Podcasts
        </h1>

        {similarPodcasts && similarPodcasts.length > 0 ? (
          <div className="podcast_grid">
            {similarPodcasts?.map(
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
          <>
            <EmptyState
              title="No similar podcasts found"
              buttonLink="/discover"
              buttonText="Discover more podcasts"
            />
          </>
        )}
      </section>
    </section>
  );
};

export default PodcastDetails;
