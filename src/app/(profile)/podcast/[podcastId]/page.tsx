import Body from "./_components/body"
import { Id } from "~/convex/_generated/dataModel"
import LoaderSpinner from "@/components/LoaderSpinner"
import React from "react"

type Props = {
    params: Promise<{ podcastId: string}>
}

const PodcastDetails = async ({
    params,
}: Props) => {
    const { podcastId } = await params
    if (!podcast) return <LoaderSpinner />

    return (
        <section className="flex w-full flex-col">
            <Body podcastId={podcastId} />
        </section>
    )
}

export default PodcastDetails
