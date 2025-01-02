import BottomBar from "@/components/global/bottom-bar"

type Props = {
    children: React.ReactNode
}

const GenLayout = ({ children }: Props) => {
    return (
        <div>
            <div className="pb-[70px] md:pl[70px]">{children}</div>
            <BottomBar />
        </div>
    )
}

export default GenLayout
