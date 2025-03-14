"use client"

import { useQuery } from "convex/react"

import EmptyState from "@/components/EmptyState"
import LoaderSpinner from "@/components/LoaderSpinner"
import PodcastCard from "@/components/PodcastCard"
import ProfileCard from "@/components/ProfileCard"
import { api } from "~/convex/_generated/api"
import PodcastPlayer from "@/components/PodcastPlayer"
import LeftSidebar from "@/components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"
import MobileNav from "@/components/MobileNav"

const ProfilePage = ({
    params,
}: {
    params: {
        profileId: string
    }
}) => {
    const user = useQuery(api.users.getUserById, {
        clerkId: params.profileId,
    })
    const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, {
        authorId: params.profileId,
    })

    if (!user || !podcastsData) return <LoaderSpinner />

    return (
        <section className="mt-9 flex flex-col">
            <div className="hidden md:flex">
                <LeftSidebar />
            </div>
            <MobileNav />
            <h1 className="text-20 font-bold text-white-1 max-md:text-center">
                Podcaster Profile
            </h1>
            <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
                {podcastsData && user ? (
                    <ProfileCard
                        podcastData={podcastsData!}
                        imageUrl={user?.imageUrl!}
                        userFirstName={user?.name!}
                    />
                ) : (
                    <div />
                )}
            </div>
            <section className="mt-9 flex flex-col gap-5">
                <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
                {podcastsData && podcastsData.podcasts.length > 0 ? (
                    <div className="podcast_grid">
                        {podcastsData?.podcasts
                            ?.slice(0, 4)
                            .map((podcast) => (
                                <PodcastCard
                                    key={podcast._id}
                                    imgUrl={podcast.imageUrl!}
                                    title={podcast.podcastTitle!}
                                    description={podcast.podcastDescription}
                                    podcastId={podcast._id}
                                />
                            ))}
                    </div>
                ) : (
                    <EmptyState
                        title="You have not created any podcasts yet"
                        buttonLink="/podcast/create"
                        buttonText="Create Podcast"
                    />
                )}
            </section>
            <div className="hidden md:flex">
                <RightSidebar />
            </div>
            <PodcastPlayer />
        </section>
    )
}

export default ProfilePage
