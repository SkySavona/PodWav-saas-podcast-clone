"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import GeneratePodcast from "@/components/GeneratePodcast";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const voiceCategories = ["Alloy", "Shimmer", "Nova", "Echo", "Fable", "Onyx"];
const { toast } = useToast();

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
});

const CreatePodcast = () => {
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState("");

  const [audioUrl, setAudioUrl] = useState("");
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [audioDuration, setAudioDuration] = useState(0);

  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const CreatePodcast = useMutation(api.podcasts.createPodcast);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if (!audioUrl || !imageUrl || !voiceType) {
        toast({
          title: "Please generate audio and image, and select a voice type",
        });
        setIsSubmitting(false);
        return; // Exit the function early if requirements are not met
      }

      await CreatePodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        imageUrl,
        audioUrl,
        audioStorageId: audioStorageId!,
        voiceType,
        voicePrompt,
        imagePrompt,
        imageStorageId: imageStorageId!,
        views: 0,
        audioDuration,
      });

      toast({
        title: "Podcast created successfully",
      });
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error creating podcast",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }
  return (
    <section className="mt-10 flex flex-col ">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Podcast Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-offset-blue-3"
                      placeholder="PodWav Pro Podcast"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select AI Voice
              </Label>
              <Select
                onValueChange={(value: unknown) =>
                  setVoiceType(value as string)
                }
              >
                <SelectTrigger
                  className={cn(
                    "text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-blue-3"
                  )}
                >
                  <SelectValue
                    placeholder="Select AI Voice"
                    className="placeholder:text-gray-1 focus-visible:ring-offset-blue-3"
                  />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus-visible:ring-offset-blue-3">
                  {voiceCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="capitalize focus:bg-blue-3"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && (
                  <audio
                    src={`/${voiceType}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                )}
              </Select>
            </div>
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-offset-blue-3"
                      placeholder="Write a short podcast description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10 text-white-1">
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType!}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />
            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />
            <div className="mt-10 w-full">
              <Button
                type="submit"
                className="text-16 w-full bg-blue-3 py-4 font-extrabold text-white-1 transtion-all duration-500 hover:bg-black-1"
              >
                {isSubmitting ? (
                  <>
                    Submitting
                    <Loader size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  "Submit & Publish Podcast"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
