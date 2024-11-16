import SignInForm from "@/components/forms/sign-in"
import { AppleAuthButton } from "@/components/global/apple-oauth-button"
import { GitHubAuthButton } from "@/components/global/github-oauth-button"
import { GoogleAuthButton } from "@/components/global/google-oauth-button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const SignInPage = () => {
    return (
        <>
            <h5 className="text-3xl font-bold text-black pb-2 dark:text-themeTextWhite">
                Sign In
            </h5>
            <p className="text-gray leading-tight">Log in to continue</p>
            <SignInForm />
            <div className="my-10 w-full relative">
                <div className="p-3 absolute text-black text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:text-themeTextWhite">
                    OR
                </div>
                <Separator
                    orientation="horizontal"
                    className="bg-transparent dark:bg-themeGray"
                />
            </div>
            <div className="grid grid-cols-2 space-x-5 pr-3">
                <GoogleAuthButton method="signin" />
                <AppleAuthButton method="signin" />
            </div>
            <div className="flex justify-center items-center pt-2 pb-3">
                <GitHubAuthButton method="signin" />
            </div>
            <div className="text-2xs">
                <p className="text-gray">
                    {" "}
                    Don&apos;t have an account?
                    <Link href="/sign-up">
                        <span className="text-sky-500 hover:underline cursor-pointer">
                            {" "}
                            Sign Up
                        </span>
                    </Link>
                </p>
            </div>
        </>
    )
}

export default SignInPage
