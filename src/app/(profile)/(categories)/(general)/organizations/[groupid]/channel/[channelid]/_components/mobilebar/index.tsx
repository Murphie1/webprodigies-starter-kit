import Menu from "@/app/(profile)/(categories)/(general)/organizations/[groupid]/_components/group-navbar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type BarProps = {
    groupId: string
}

const Bar = ({ groupId }: BarProps) => {
    return (
        <div className="relative overflow-x-auto whitespace-nowrap">
            <ScrollArea className="whitespace-nowrap rounded-md border items-center justify-center">
                <Menu orientation="mobile" groupid={groupId} />
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default Bar
