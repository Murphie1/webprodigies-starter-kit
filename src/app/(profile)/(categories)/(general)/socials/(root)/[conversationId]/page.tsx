import { getConversationById } from "@/actions/uMessage"
import { getMessages } from "@/actions/uMessage"
import EmptyStateTwo from "@/components/uMessage/EmptyState"

//import AsyncHeader from "./_components/AsyncHeader"
import Body from "./_components/Body"
import Form from "./_components/Form"

interface IParams {
    conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {
    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyStateTwo />
                </div>
            </div>
        )
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                {/*<AsyncHeader conversation={conversation} />*/}
                <Body initialMessages={messages} />
                <Form />
            </div>
        </div>
    )
}

export default ConversationId
