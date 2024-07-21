"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { formatTime } from "@/lib/formatTime";
import { cn } from "@/lib/utils";
import { useAudio } from "@/app/providers/AudioProvider";

import { Progress } from "./ui/progress";

const PodcastPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.25);
  const { audio, setAudio } = useAudio();
  const [isForwardAnimating, setIsForwardAnimating] = useState(false);
  const [isRewindAnimating, setIsRewindAnimating] = useState(false);
  const [isCloseAnimating, setIsCloseAnimating] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted((prev) => !prev);
    }
  };

  const forward = () => {
    if (audioRef.current && audioRef.current.currentTime + 5 > 0) {
      audioRef.current.currentTime += 5;
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleForwardClick = () => {
    setIsForwardAnimating(true);
    forward();
    setTimeout(() => setIsForwardAnimating(false), 300); // Reset after animation
  };

  const rewind = () => {
    if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
      audioRef.current.currentTime -= 5;
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleRewindClick = () => {
    setIsRewindAnimating(true);
    rewind();
    setTimeout(() => setIsRewindAnimating(false), 300); // Reset after animation
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleClose = () => {
    setIsCloseAnimating(true);
    setTimeout(() => {
      setAudio(undefined);
      setIsCloseAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateCurrentTime);

      return () => {
        audioElement.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audio?.audioUrl) {
      if (audioElement) {
        audioElement.play().then(() => {
          setIsPlaying(true);
        });
      }
    } else {
      audioElement?.pause();
      setIsPlaying(true);
    }
  }, [audio]);
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
        hidden: !audio?.audioUrl || audio?.audioUrl === "",
      })}
    >
      <Progress
        value={(currentTime / duration) * 100}
        className="w-full"
        max={Math.max(duration, 0.01)} // Ensure
      />
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <audio
          ref={audioRef}
          src={audio?.audioUrl}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />
        <div className="flex items-center gap-4 max-md:hidden">
          <Link href={`/podcast/${audio?.podcastId}`}>
            <Image
              src={audio?.imageUrl! || "/images/player1.png"}
              width={64}
              height={64}
              alt="player1"
              className="aspect-square rounded-xl"
            />
          </Link>
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 truncate font-semibold text-white-1">
              {audio?.title}
            </h2>
            <p className="text-12 font-normal text-white-2">{audio?.author}</p>
          </div>
        </div>
        <div className="flex-center cursor-pointer gap-3 md:gap-6">
          <div className="flex items-center gap-1.5">
            <Image
              src={"/icons/reverse.svg"}
              width={24}
              height={24}
              alt="rewind"
              onClick={handleRewindClick}
              className={`cursor-pointer ${isRewindAnimating ? "animate-click" : ""}`}
            />
            <h2 className="text-12 font-bold text-white-4">-5</h2>
          </div>
          <Image
            src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
            width={30}
            height={30}
            alt="play"
            onClick={togglePlayPause}
          />
          <div className="flex items-center gap-1.5">
            <h2 className="text-12 font-bold text-white-4">+5</h2>
            <Image
              src={"/icons/forward.svg"}
              width={24}
              height={24}
              alt="forward"
              onClick={handleForwardClick}
              className={`cursor-pointer ${isForwardAnimating ? "animate-click" : ""}`}
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <h2 className="text-16 font-normal text-white-2 max-md:hidden">
            {formatTime(duration)}
          </h2>
          <div className="flex w-full gap-2">
            <Image
              src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
              width={24}
              height={24}
              alt="mute unmute"
              onClick={toggleMute}
              className="cursor-pointer"
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 mt-3 ml-5 cursor-pointer appearance-none bg-gray-1 h-1 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white-1"
              style={{
                background: `linear-gradient(to right, #FFFFFF ${volume * 100}%, #71788B ${volume * 100}%)`,
              }}
            />
            <Image
              src="/icons/close.svg"
              width={24}
              height={24}
              alt="close"
              onClick={handleClose}
              className={`cursor-pointer transition-opacity w-5 h-5 absolute right-4 top-4 text-white-3 hover:text-white-4 ${
                isCloseAnimating ? "animate-click opacity-50" : "opacity-100"
              }`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastPlayer;
