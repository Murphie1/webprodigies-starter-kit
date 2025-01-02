//import { onAuthenticatedUser } from "@/actions/auth"
import { Laugh, Mic, Plus, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery } from "convex/react"
import { api } from "~/convex/_generated/api"
import { useConversationStore } from "@/store/chat-store"
import toast from "react-hot-toast"
import useComponentVisible from "@/hooks/uMessage/useComponentVisible"
import EmojiPicker, { Theme } from "emoji-picker-react"
import MediaDropdown from "./media-dropdown"

type Props = {
    clerkId: string;
}
const MessageInput = ({ clerkId }: Props) => {
    const [msgText, setMsgText] = useState("")
    const { selectedConversation } = useConversationStore()
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(false)
//const clerk = await onAuthenticatedUser()
    const me = useQuery(api.users.getMe, {
        clerkId: clerkId!,
    })
    const sendTextMsg = useMutation(api.messages.sendTextMessage)

    const handleSendTextMsg = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await sendTextMsg({
                clerkId: clerkId!,
                content: msgText,
                conversation: selectedConversation!._id,
                sender: me!._id,
            })
            setMsgText("")
        } catch (err: any) {
            toast.error(err.message)
            console.error(err)
        }
    }

    return (
        <div className="fixed bottom-15 z-40 bg-gray-primary p-2 flex gap-4 items-center">
            <div className="relative flex gap-2 ml-2">
                {/* EMOJI PICKER WILL GO HERE */}
                <div ref={ref} onClick={() => setIsComponentVisible(true)}>
                    {isComponentVisible && (
                        <EmojiPicker
                            theme={Theme.DARK}
                            onEmojiClick={(emojiObject) => {
                                setMsgText((prev) => prev + emojiObject.emoji)
                            }}
                            style={{
                                position: "absolute",
                                bottom: "1.5rem",
                                left: "1rem",
                                zIndex: 50,
                            }}
                        />
                    )}
                    <Laugh className="text-gray-600 dark:text-gray-400" />
                </div>
                <MediaDropdown clerkId={clerkId} />
            </div>
            <form onSubmit={handleSendTextMsg} className="w-full flex gap-3">
                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Type a message"
                        className="py-2 text-sm w-full rounded-lg shadow-sm bg-gray-tertiary focus-visible:ring-transparent"
                        value={msgText}
                        onChange={(e) => setMsgText(e.target.value)}
                    />
                </div>
                <div className="mr-4 flex items-center gap-3">
                    {msgText.length > 0 ? (
                        <Button
                            type="submit"
                            size={"sm"}
                            className="bg-transparent text-foreground hover:bg-transparent"
                        >
                            <Send />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            size={"sm"}
                            className="bg-transparent text-foreground hover:bg-transparent"
                        >
                            <Mic />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}
export default MessageInput
