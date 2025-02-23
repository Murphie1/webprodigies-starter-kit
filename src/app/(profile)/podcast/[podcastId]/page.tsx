import Body from "./_components/body"
import { Id } from "~/convex/_generated/dataModel"
import LoaderSpinner from "@/components/LoaderSpinner"
import React from "react"

const PodcastDetails = ({
    params: { podcastId },
}: {
    params: Promise<{ podcastId: Id<"podcasts"> }>
}) => {
    const { podcastId } = await params
    if (!podcast) return <LoaderSpinner />

    return (
        <section className="flex w-full flex-col">
            <Body podcastId={podcastId} />
        </section>
    )
}

export default PodcastDetails
