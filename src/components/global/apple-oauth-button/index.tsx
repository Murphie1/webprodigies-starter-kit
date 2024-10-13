"use client"

import { Button } from "@/components/ui/button"
import { useAppleAuth } from "@/hooks/authentication"
import { FaApple } from "react-icons/fa"
import { Loader } from "../loader"

type AppleAuthButtonProps = {
  method: "signup" | "signin"
}

export const AppleAuthButton = ({ method }: GoogleAuthButtonProps) => {
  const { signUpWith, signInWith } = useAppleAuth()
  return (
    <Button
      {...(method === "signin"
        ? {
            onClick: () => signInWith("oauth_apple"),
          }
        : {
            onClick: () => signUpWith("oauth_apple"),
          })}
      className="w-full rounded-2xl flex gap-3 bg-themeBlack border-themeGray"
      variant="outline"
    >
      <Loader loading={false}>
        <FaApple />
        Apple
      </Loader>
    </Button>
  )
}