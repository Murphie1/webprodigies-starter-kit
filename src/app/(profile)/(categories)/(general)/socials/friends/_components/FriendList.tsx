"use client"

import { FullFriendType } from "@/type"
import FriendBox from "./FriendBox"

interface UserListProps {
    items: FullFriendType[]
}

const FriendList: React.FC<UserListProps> = ({ items }) => {
    return (
        <aside
            className="
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        block
        w-full
        left-0
      "
        >
            <div className="px-5">
                <div className="flex-col">
                    <div
                        className="
            text-2xl
            font-bold
            text-neutral-800
            py-4
          "
                    >
                        Friends
                    </div>
                </div>
                {items.map((item) => (
                    <FriendBox key={item.id} data={item} />
                ))}
            </div>
        </aside>
    )
}

export default FriendList
