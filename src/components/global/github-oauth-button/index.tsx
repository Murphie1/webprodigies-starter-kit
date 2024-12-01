"use client"

import { Button } from "@/components/ui/button"
import { useGitHubAuth } from "@/hooks/authentication"
import { FaGithub } from "react-icons/fa"
import { Loader } from "../loader"

type GitHubAuthButtonProps = {
    method: "signup" | "signin"
}

export const GitHubAuthButton = ({ method }: GitHubAuthButtonProps) => {
    const { signUpWith, signInWith } = useGitHubAuth()
    return (
        <Button
            {...(method === "signin"
                ? {
                      onClick: () => signInWith("oauth_github"),
                  }
                : {
                      onClick: () => signUpWith("oauth_github"),
                  })}
            className="w-auto rounded-2xl flex gap-3 bg-white dark:bg-themeBlack border-black dark:border-themeGray"
            variant="outline"
        >
            <Loader loading={false}>
                <FaGithub />
                GitHub
            </Loader>
        </Button>
    )
}
