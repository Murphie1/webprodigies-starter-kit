import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { GroupChatMenu } from "@/app/(profile)/(categories)/(general)/organizations/[groupid]/messages/_components/chat-menu"

type LeaderBoardCardProps = {
    groupId: string
}

export const LeaderBoardCard = ({ groupId }: LeaderBoardCardProps) => {
    return (
        <Card className="bg-transparent border-black dark:border-themeGray lg:sticky lg:top-0 mt-10 lg:mt-0 rounded-xl p-5 overflow-hidden">
            <div className="overflow-y-auto">
            <p className="text-black dark:text-themeTextGray text-sm">
                Group Members
            </p>
                <GroupChatMenu groupid={groupId} />
                </div>
        </Card>
    )
}
