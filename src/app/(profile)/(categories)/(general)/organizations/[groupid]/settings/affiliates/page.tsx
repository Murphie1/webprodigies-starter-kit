import { onGetAffiliateLink } from "@/actions/groups"
import { CopyButton } from "@/components/global/copy-button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"

type Props = {
    params: { groupid: string }
}

const Affiliate = async ({ params }: Props) => {
    const affiliate = await onGetAffiliateLink(params.groupid)
    return (
        <div className="flex flex-col items-start p-5">
            <Card className="border-black dark:border-themeGray bg-white dark:bg-[#1A1A1D] p-5">
                <CardTitle className="text-3xl">Affiliate Link</CardTitle>
                <CardDescription className="text-gray dark:text-themeTextGray">
                    Create and share an invitations link
                </CardDescription>
                <div className="mt-8 flex flex-col gap-y-2">
                    <div className="bg-white dark:bg-black border-black dark:border-themeGray p-3 rounded-lg flex gap-x-5 items-center">
                        https://ylttest.vercel.app/affiliates/
                        {affiliate.affiliate?.id}
                        <CopyButton
                            content={`https://ylttest.vercel.app/${affiliate.affiliate?.id}`}
                        />
                    </div>
                    <CardDescription className="text-gray dark:text-themeTextGray">
                        This link will redirect users to the main page where{" "}
                        <br />
                        they can purchase or request memberships
                    </CardDescription>
                </div>
            </Card>
        </div>
    )
}

export default Affiliate
