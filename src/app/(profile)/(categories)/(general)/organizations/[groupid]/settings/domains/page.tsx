import { onGetDomainConfig } from "@/actions/groups"
import { CustomDomainForm } from "@/components/forms/domain"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query"

type Props = { 
    params: Promise<{ groupid: string }>
}

const DomainConfigPage = async ({ params }: Props) => {
    const { groupid } = await params;
    
    const client = new QueryClient()

    await client.prefetchQuery({
        queryKey: ["domain-config"],
        queryFn: () => onGetDomainConfig(groupid),
    })

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <div className="flex flex-col items-start p-5 gap-y-5">
                <Card className="border-black bg-white dark:border-themeGray dark:bg-[#1A1A1D] p-5">
                    <CardTitle className="text-3xl">Domain Config</CardTitle>
                    <CardDescription className="text-black dark:text-themeTextGray">
                        Create and share an invitations link for your members{" "}
                    </CardDescription>
                    <CustomDomainForm groupid={groupid} />
                </Card>
                <Card className="border-black bg-white dark:border-themeGray dark:bg-[#1A1A1D] p-5">
                    <CardTitle className="text-3xl">Manual Config</CardTitle>
                    <CardDescription>
                        Setup your domain manually{" "}
                    </CardDescription>
                    <div className="flex gap-x-5 mt-8">
                        <Label className="flex flex-col gap-y-3">
                            Record
                            <span className="bg-gray-50 dark:bg-themeDarkGray p-3 rounded-lg text-xs text-black dark:text-themeTextGray">
                                A
                            </span>
                        </Label>
                        <Label className="flex flex-col gap-y-3">
                            Host
                            <span className="bg-gray-50 dark:bg-themeDarkGray p-3 rounded-lg text-xs text-black dark:text-themeTextGray">
                                @
                            </span>
                        </Label>
                        <Label className="flex flex-col gap-y-3">
                            Required Value
                            <span className="bg-gray-50 dark:bg-themeDarkGray p-3 rounded-lg text-xs text-black dark:text-themeTextGray">
                                76.76.21.21
                            </span>
                        </Label>
                    </div>
                </Card>
            </div>
        </HydrationBoundary>
    )
}

export default DomainConfigPage
