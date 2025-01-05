import { Modal } from "./modal";
import { VideoModal } from "./video";
import { HtmlParser } from "@/components/global/html-parser";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PostAuthor } from "./post-author";
import { Interactions } from "./interactions";

type PostCardProps = {
  userimage?: string;
  image?: string | null;
  video?: string | null;
  content: string;
  username?: string;
  html: string;
  channelname: string;
  title: string;
  likes: number;
  comments: number;
  postid: string;
  likedUser?: string;
  userid?: string;
  likeid?: string;
  optimisitc?: boolean;
};

export const PostCard = ({
  userimage,
  username,
  html,
  image,
  video,
  content,
  channelname,
  title,
  likes,
  comments,
  postid,
  likedUser,
  userid,
  likeid,
  optimisitc,
}: PostCardProps) => {
  const pathname = usePathname();
  return (
    <Card className="border-black dark:border-themeGray bg-white dark:bg-[#1A1A1D] rounded-2xl overflow-hidden">
      <CardContent className="p-3 flex flex-col gap-y-6 items-start">
        {/* Post Author Info */}
        <PostAuthor
          image={userimage}
          username={username}
          channel={channelname}
        />

        {/* Link to Post */}
        <div className="w-full">
          <div className="flex flex-col gap-y-3">
            <h2 className="text-2xl font-semibold">{title}</h2>
            {/* Conditional Rendering for Media */}
            {image && <Modal image={image} />}
            {video && <VideoModal video={video} />}
            <Link href={`${pathname}/${postid}`} className="w-full">
            <HtmlParser html={html} />
              </Link>
          </div>
          </div>
      </CardContent>

      {/* Separator */}
      <Separator
        orientation="horizontal"
        className="bg-black dark:bg-themeGray mt-3"
      />

      {/* Interactions Section */}
      <Interactions
        id={postid}
        userid={userid}
        likes={likes}
        comments={comments}
        likedUser={likedUser}
        likeid={likeid}
        optimisitc={optimisitc}
      />
    </Card>
  );
};
