import SignUpForm from "@/components/forms/sign-up"
import { GoogleAuthButton } from "@/components/global/google-oauth-button"
import { AppleAuthButton } from "@/components/global/apple-oauth-button"
import { GitHubAuthButton } from "@/components/global/github-oauth-button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

type Props = {}

const SignUpPage = (props: Props) => {
  return (
    <>
      <h5 className="text-3xl font-bold text-base text-themeTextWhite pb-2">Sign up</h5>
      <p className="text-themeTextGray leading-tight">
        Sign Up to begin
      </p>
      <SignUpForm />
      <div className="my-10 w-full relative">
        <div className="p-3 absolute text-themeTextWhite text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          OR 
        </div>
        <Separator orientation="horizontal" className="bg-themeGray" />
      </div>
      <div className="grid grid-cols-2 space-x-5 pr-3">
      <GoogleAuthButton method="signup" />
      <AppleAuthButton method="signup" />
      </div>
      <div className="flex justify-center items-center pt-2 pb-3">
      <GitHubAuthButton method="signup" />
      </div>
      <div className="text-2xs">
<p className="text-grey"> Already have an account?
<Link href="/sign-in"><span className="text-sky-500 hover:underline cursor-pointer"> Sign In
</span></Link></p>
</div>
    </>
  )
}

export default SignUpPage
