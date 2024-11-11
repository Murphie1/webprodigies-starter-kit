import BackdropGradient from "@/components/global/backdrop-gradient"
import OrganizationNavbar from "../_components/Gen-navbar"
import GlassCard from "@/components/global/glass-card"
import GradientText from "@/components/global/gradient-text"
import { GROUPLE_CONSTANTS } from "@/constants"

type Props = {
    children: React.ReactNode
}

const CreateGroupLayout = ({ children }: Props) => {
    return (
        <>
            <div className="bg-black">
                <OrganizationNavbar />
            </div>
            <div className="container h-auto grid grid-cols-1 lg:grid-cols-2 content-center">
                <div className="flex items-center">
                    <BackdropGradient className="w-8/12 h-2/6 opacity-50">
                        <h5 className="text-2xl font-bold text-themeTextWhite">
                            Welcome.
                        </h5>
                        <GradientText
                            element="H2"
                            className="text-4xl font-semibold py-1 md:hidden"
                        >
                            Create Your Organization
                        </GradientText>
                        <h2 className="hidden md:text-4xl font-bold text-themeTextWhite">
                            Create Your Organization
                        </h2>
                        <p className="text-themeTextGray">
                            Free, All features. Unlimited everything. Additional
                            fees apply.
                        </p>
                        <div className="flex flex-col gap-3 mt-16 pl-5">
                            {GROUPLE_CONSTANTS.createGroupPlaceholder.map(
                                (placeholder) => (
                                    <div
                                        className="flex gap-3"
                                        key={placeholder.id}
                                    >
                                        {placeholder.icon}
                                        <p className="text-themeTextGray">
                                            {placeholder.label}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>
                    </BackdropGradient>
                </div>
                <div>
                    <BackdropGradient
                        className="w-6/12 h-3/6 opacity-40"
                        container="lg:items-center"
                    >
                        <GlassCard className="xs:w-full lg:w-10/12 xl:w-8/12 mt-16 py-7">
                            {children}
                        </GlassCard>
                    </BackdropGradient>
                </div>
            </div>
        </>
    )
}

export default CreateGroupLayout
