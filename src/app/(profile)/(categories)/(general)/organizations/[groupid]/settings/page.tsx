import GroupSettingsForm from "@/components/forms/group-settings"

type Props = {
    params: Promise<{ groupid: string }>
}

const GroupSettingsPage = ({ params }: Props) => {

    const { groupid } = await params;
    
    return (
        <div className="flex flex-col w-full h-full gap-10 px-16 py-10 overflow-auto">
            <div className="flex flex-col">
                <h3 className="text-3xl font-bold">Organization Settings</h3>
                <p className="text-sm text-black dark:text-themeTextGray">
                    Adjust your settings here. These settings might take time to
                    reflect on the explore page.
                </p>
            </div>
            <GroupSettingsForm groupId={groupid} />
        </div>
    )
}

export default GroupSettingsPage
