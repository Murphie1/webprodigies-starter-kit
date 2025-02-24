import Body from "./_components/body"
import LoaderSpinner from "@/components/LoaderSpinner"

const ProfilePage = async ({
    params,
}: {
    params: Promise<{
        profileId: string
    }>
}) => {
    const { profileId } = await params
    
    if (!profileId) return <LoaderSpinner />

    return (
        <section className="mt-9 flex flex-col">
            <Body profileId={profileId} />
        </section>
)
}
export default ProfilePage
