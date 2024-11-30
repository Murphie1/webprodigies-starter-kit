import { onAuthenticatedUser } from "@/actions/auth"
import { onGetAffiliateInfo } from "@/actions/groups"
import CreateGroup from "@/components/forms/create-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import { redirect } from "next/navigation"
import Link from "next/link"

const GroupCreatePage = async ({
    searchParams,
}: {
    searchParams: { [affiliate: string]: string }
}) => {
    const user = await onAuthenticatedUser()

    const affiliate = await onGetAffiliateInfo(searchParams.affiliate)

    if (!user || !user.id) redirect("/sign-in")

    return (
        <>
            <div className="px-7 flex flex-col sm:pt-2">
                <h5 className="font-bold text-base text-black dark:text-themeTextWhite">
                    Payment Method: Stripe
                </h5>
                <Link href="/stripe.com">
                <p className="text-black hover:text-sky-400 text-sm leading-tight dark:text-themeWhite">
                    Or pay on Stripe&apos;s checkout website for Maximum Security
                </p>
                    </Link>
                {affiliate.status === 200 && (
                    <div className="w-full mt-5 flex justify-center items-center gap-x-2 italic text-themeTextGray text-sm">
                        You were referred by
                        <Avatar>
                            <AvatarImage
                                src={
                                    affiliate.user?.Group?.User.image as string
                                }
                                alt="User"
                            />
                            <AvatarFallback>
                                <User />
                            </AvatarFallback>
                        </Avatar>
                        {affiliate.user?.Group?.User.firstname}{" "}
                        {affiliate.user?.Group?.User.lastname}
                    </div>
                )}
            </div>
            <CreateGroup
                userId={user.id}
                affiliate={affiliate.status === 200 ? true : false}
                stripeId={affiliate.user?.Group?.User.stripeId || ""}
            />
        </>
    )
}

export default GroupCreatePage
