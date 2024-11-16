import { Skeleton as SkeletonUI } from "@/components/ui/skeleton"

type Props = {
    element: "CARD" | "POST"
}

const Skeleton = ({ element }: Props) => {
    switch (element) {
        case "CARD":
            return (
                <div className="flex flex-col gap-y-3 h-full bg-[#EFEFEF] rounded-xl overflow-hidden dark:bg-[#181818]">
                    <SkeletonUI className="h-[200px] w-full bg-[#F5F5F5] dark:bg-[#202020]" />
                    <SkeletonUI className="h-[40px] w-7/12 rounded-md ml-5 bg-[#F5F5F5] dark:bg-[#202020]" />
                    <SkeletonUI className="h-[30px] w-4/12 rounded-md ml-5 bg-[#F5F5F5] dark:bg-[#202020]" />
                </div>
            )

        case "POST":
            return (
                <div className=" w-full pt-4 bg-[#FAFAFA] text-black rounded-lg border border-[#F2F2F2] overflow-hidden dark:text-white dark:bg-[#1C1C1E] dark:border-[#27272A]">
                    <div className="flex items-center mb-3 px-4">
                        <SkeletonUI className="w-12 h-12 mr-4 rounded-full bg-[#F5F5F5] dark:bg-[#202020]" />
                        <div>
                            <SkeletonUI className="h-5 w-24 rounded-md bg-[#F5F5F5] mb-1 dark:bg-[#202020]" />
                            <SkeletonUI className="h-4 w-40 rounded-md bg-[#F5F5F5] dark:bg-[#202020]" />
                        </div>
                    </div>
                    <SkeletonUI className="h-[280px] w-full bg-[#F5F5F5] dark:bg-[#202020]" />
                    <div className="flex items-center gap-3 border-t border-[#F2F2F2] px-6 py-2 dark:border-[#27272A]">
                        <SkeletonUI className="h-4 w-20 rounded-md bg-[#F5F5F5] dark:bg-[#202020]" />
                        <SkeletonUI className="h-4 w-20 rounded-md bg-[#F5F5F5] dark:bg-[#202020]" />
                        <SkeletonUI className="h-4 w-20 rounded-md bg-[#F5F5F5] dark:bg-[#202020]" />
                    </div>
                </div>
            )

        default:
            return <></>
    }
}

export default Skeleton
