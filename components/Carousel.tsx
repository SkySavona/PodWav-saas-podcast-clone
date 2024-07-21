import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { DotButton } from "./EmblaCarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import LoaderSpinner from "./LoaderSpinner";
import { Id } from "@/convex/_generated/dataModel";

interface CarouselProps {
  fansLikeDetail: Array<{
    totalPodcasts: number;
    podcast: Array<{ podcastTitle: string; podcastId: Id<"podcasts"> }>;
    _id: Id<"users">;
    _creationTime: number;
    name: string;
    imageUrl: string;
    email: string;
    clerkId: string;
  }>;
  onSlideClick: (clerkId: string) => void;
}

const EmblaCarousel: React.FC<CarouselProps> = ({
  fansLikeDetail,
  onSlideClick,
}) => {
  const { user } = useUser();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay || !("stopOnInteraction" in autoplay.options)) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      onNavButtonClick(emblaApi);
    },
    [emblaApi, onNavButtonClick]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!fansLikeDetail) return <LoaderSpinner />;

  const slides = fansLikeDetail.filter((item) => item.totalPodcasts > 0);

  if (slides.length === 0) return <LoaderSpinner />;

  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="flex space-x-4 p-2">
          {slides.map((item) => (
            <figure
              key={item._id}
              className="carousel_box flex-shrink-0"
              onClick={() => onSlideClick(item.clerkId)}
            >
              <Image
                src={item.imageUrl}
                fill={true}
                className="size-full rounded-xl border-none"
                alt="card"
              />
              <div className="glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4 overflow-hidden">
                <h2 className="text-14 font-semibold text-white-1">
                  {item.podcast[0]?.podcastTitle}
                </h2>
                <p className="text-12 font-normal text-white-2">{item.name}</p>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            selected={index === selectedIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default EmblaCarousel;