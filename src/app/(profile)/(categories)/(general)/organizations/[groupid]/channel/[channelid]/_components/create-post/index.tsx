"use client";

import { PostContent } from "@/components/global/post-content";
import { SimpleModal } from "@/components/global/simple-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useChannelPage } from "@/hooks/channels";
import { PostCard } from "../post-feed/post-card";

type Props = { userImage: string; channelid: string; username: string };

const CreateNewPost = ({ channelid, userImage, username }: Props) => {
    const { data, mutation } = useChannelPage(channelid);
    const { name } = data as { name: string };

    return (
        <>
            <SimpleModal
                trigger={
                    <span>
                        <Card className="border border-black dark:border-themeGray cursor-pointer rounded-2xl overflow-hidden">
                            <CardContent className="p-3 bg-white dark:bg-[#1A1A1D] flex gap-x-6 items-center">
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={userImage} alt="user" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <CardDescription className="text-black dark:text-themeTextGray">
                                    Click here to create a post.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </span>
                }
            >
                <div className="flex gap-x-3 items-start p-4">
                    {/* User Avatar and Name */}
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={userImage} alt="user" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-black dark:text-themeTextGray text-sm capitalize">
                            {username}
                        </p>
                        <p className="text-sm capitalize text-black dark:text-themeTextGray">
                            Posting in{" "}
                            <span className="font-bold capitalize text-themeTextBlack dark:text-themeTextWhite">
                                {name}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="h-full max-h-[calc(100vh-120px)] overflow-y-auto p-4 bg-white dark:bg-[#1A1A1D] rounded-md">
                    <PostContent channelid={channelid} />
                </div>
            </SimpleModal>

            {/* Optimistic Post Rendering */}
            {mutation.length > 0 &&
                mutation[0].status === "pending" &&
                mutation[0].state && (
                    <PostCard
                        channelname={name}
                        userimage={userImage}
                        username={username}
                        html={mutation[0].state.htmlcontent}
                        title={mutation[0].state.title}
                        content={mutation[0].state.content}
                        image={mutation[0].state.image}
                        video={mutation[0].state.video}
                        likes={0}
                        comments={0}
                        postid={mutation[0].state.postid}
                        optimisitc
                    />
                )}
        </>
    );
};

export default CreateNewPost;
