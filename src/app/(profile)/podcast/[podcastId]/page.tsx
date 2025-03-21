"use client"

import EmptyState from "@/components/EmptyState"
import LoaderSpinner from "@/components/LoaderSpinner"
import PodcastCard from "@/components/PodcastCard"
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer"
import PodcastPlayer from "@/components/PodcastPlayer"
import LeftSidebar from "@/components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"
import MobileNav from "@/components/MobileNav"
import { api } from "~/convex/_generated/api"
import { Id } from "~/convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import Image from "next/image"
import React from "react"

const PodcastDetails = ({
    params: { podcastId },
}: {
    params: { podcastId: Id<"podcasts"> }
}) => {
    const { user } = useUser()

    const podcast = useQuery(api.podcasts.getPodcastById, { podcastId })

    const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, {
        podcastId,
    })

    const isOwner = user?.id === podcast?.authorId

    if (!similarPodcasts || !podcast) return <LoaderSpinner />

    return (
        <section className="flex w-full flex-col">
            <div className="hidden md:flex">
                <LeftSidebar />
            </div>
            <MobileNav />
            <header className="mt-9 flex items-center justify-between">
                <h1 className="text-20 font-bold text-white-1">
                    Currenty Playing
                </h1>
                <figure className="flex gap-3">
                    <Image
                        src="/icons/headphone.svg"
                        width={24}
                        height={24}
                        alt="headphone"
                    />
                    <h2 className="text-16 font-bold text-white-1">
                        {podcast?.views}
                    </h2>
                </figure>
            </header>

            {podcast ? (
                <PodcastDetailPlayer
                    isOwner={isOwner}
                    podcastId={podcast._id}
                    audioUrl={
                        podcast?.audioUrl ||
                        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    }
                    podcastTitle={podcast.podcastTitle!}
                    author={podcast.author!}
                    imageUrl={podcast.imageUrl!}
                    imageStorageId={podcast.imageStorageId!}
                    audioStorageId={podcast.audioStorageId!}
                    authorImageUrl={podcast.authorImageUrl!}
                    authorId={podcast.authorId!}
                />
            ) : (
                <div />
            )}

            <p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
                {podcast?.podcastDescription}
            </p>

            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-18 font-bold text-white-1">
                        Transcription
                    </h1>
                    <p className="text-16 font-medium text-white-2">
                        {podcast?.voicePrompt}
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-18 font-bold text-white-1">
                        Thumbnail Prompt
                    </h1>
                    <p className="text-16 font-medium text-white-2">
                        {podcast?.imagePrompt}
                    </p>
                </div>
            </div>
            <section className="mt-8 flex flex-col gap-5">
                <h1 className="text-20 font-bold text-white-1">
                    Similar Podcasts
                </h1>

                {similarPodcasts && similarPodcasts.length > 0 ? (
                    <div className="podcast_grid">
                        {similarPodcasts?.map(
                            ({
                                _id,
                                podcastTitle,
                                podcastDescription,
                                imageUrl,
                            }) => (
                                <PodcastCard
                                    key={_id}
                                    imgUrl={imageUrl as string}
                                    title={podcastTitle}
                                    description={podcastDescription}
                                    podcastId={_id}
                                />
                            ),
                        )}
                    </div>
                ) : (
                    <>
                        <EmptyState
                            title="No similar podcasts found"
                            buttonLink="/home/search/podcasts"
                            buttonText="Discover more podcasts"
                        />
                    </>
                )}
            </section>
            <div className="hidden md:flex">
                <RightSidebar />
            </div>
            <PodcastPlayer />
        </section>
    )
}

export default PodcastDetails
