
import { Conversation, User } from "@prisma/client"
import { useMemo } from "react"
import { format } from "date-fns"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Heart } from "lucide-react"
import Avatar from "@/components/uMessage/Avatar"
import ConfirmModal from "./ConfirmModal"
import AvatarGroup from "@/components/uMessage/AvatarGroup"
import useActiveList from "@/hooks/uMessage/useActiveList"

interface ProfileDrawerProps {
    data: Conversation & {
        users: User[]
    }
    otherUser: User
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = async ({ data, otherUser }) => {
    const otherUser = {otherUser}
    const { members } = useActiveList()
    const isActive = members.indexOf(otherUser.email!) !== -1

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), "PP")
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return data.name || otherUser.firstname
    }, [data.name, otherUser.firstname])

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`
        }

        return isActive ? "Active" : "Offline"
    }, [data, isActive])

    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <Heart
                        size={22}
                        className="
            text-sky-500
            cursor-pointer
            hover:text-sky-600
            transition
          "
                    />
                </SheetTrigger>
                <SheetContent
                    side="right"
                    className="
                      pointer-events-auto
                      w-screen
                      max-w-md
                    "
                >
                    <div
                        className="
                        flex
                        h-full
                        flex-col
                        overflow-y-scroll
                        bg-white
                        py-6
                        shadow-xl
                      "
                    >
                        <div
                            className="
                        relative mt-6
                        flex-1 px-4
                        sm:px-6
                      "
                        >
                            <div
                                className="
                          flex flex-col items-center
                        "
                            >
                                <div className="mb-2">
                                    {data.isGroup ? (
                                        <AvatarGroup users={data.users} />
                                    ) : (
                                        <Avatar user={otherUser} />
                                    )}
                                </div>
                                <div>{title}</div>
                                <div
                                    className="
                            text-sm text-gray-500
                          "
                                >
                                    {statusText}
                                </div>
                                <div className="flex gap-10 my-8">
                                    <div
                                        className="
                                flex
                                flex-col
                                gap-3
                                items-center
                                cursor-pointer
                                hover:opacity-75
                              "
                                    >
                                        <div
                                            className="
                                  w-10
                                  h-10
                                  bg-neutral-100
                                  rounded-full
                                  flex
                                  items-center
                                  justify-center
                                "
                                        >
                                            <ConfirmModal />
                                        </div>
                                        <div
                                            className="
                                  text-sm
                                  font-light
                                  text-neutral-600
                                "
                                        >
                                            Delete
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="
                              w-full
                              pb-5
                              pt-5
                              sm:px-0
                              sm:pt-0
                            "
                                >
                                    <dl
                                        className="
                                space-y-8
                                px-4
                                sm:space-y-6
                                sm:px-6
                              "
                                    >
                                        {data.isGroup && (
                                            <div>
                                                <dt
                                                    className="
                                      text-sm
                                      font-medium
                                      text-gray-500
                                      sm:w-40
                                      sm:flex-shrink-0
                                    "
                                                >
                                                    Emails
                                                </dt>
                                                <dd
                                                    className="
                                      mt-1
                                      text-sm
                                      text-gray-900
                                      sm:col-span-2
                                    "
                                                >
                                                    {data.users
                                                        .map(
                                                            (user) =>
                                                                user.email,
                                                        )
                                                        .join(", ")}
                                                </dd>
                                            </div>
                                        )}
                                        {!data.isGroup && (
                                            <div>
                                                <dt
                                                    className="
                                      text-sm
                                      font-medium
                                      text-gray-500
                                      sm:w-40
                                      sm:flex-shrink-0
                                    "
                                                >
                                                    Email
                                                </dt>
                                                <dd
                                                    className="
                                      mt-1
                                      text-sm
                                      text-gray-900
                                      sm:col-span-2
                                    "
                                                >
                                                    {otherUser.email}
                                                </dd>
                                            </div>
                                        )}
                                        {!data.isGroup && (
                                            <>
                                                <hr />
                                                <div>
                                                    <dt
                                                        className="
                                        text-sm
                                        font-medium
                                        text-gray-500
                                        sm:w-40
                                        sm:flex-shrink-0
                                      "
                                                    >
                                                        Joined
                                                    </dt>
                                                    <dd
                                                        className="
                                        mt-1
                                        text-sm
                                        text-gray-900
                                        sm:col-span-2
                                      "
                                                    >
                                                        <time
                                                            dateTime={
                                                                joinedDate
                                                            }
                                                        >
                                                            {joinedDate}
                                                        </time>
                                                    </dd>
                                                </div>
                                            </>
                                        )}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default ProfileDrawer
