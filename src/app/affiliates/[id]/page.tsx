import { onVerifyAffilateLink } from "@/actions/groups"
import { redirect } from "next/navigation"

const AffiliatesPage = async ({ params }: { params: { id: string } }) => {
    const status = await onVerifyAffilateLink(params.id)

    if (status.status === 200) {
        return redirect(`/organizations/create?affiliate=${params.id}`)
    }

    if (status.status !== 200) {
        return redirect("/sign-in")
    }
}

export default AffiliatesPage
