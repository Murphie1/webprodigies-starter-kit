import React from "react"

export function ProfileBottom() {
    return (
        <div>
            <h4>Starter Tools</h4>
            <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
                <a
                    href="/about"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    aria-label="Learn more about YouLearn"
                >
                    <h2 className="mb-3 text-2xl font-semibold">
                        About{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className="m-0 max-w-[30ch] text-sm opacity-50">
                        Find in-depth information about YouLearn&apos;s features
                        and services.
                    </p>
                </a>

                <a
                    href="/plans"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    aria-label="View available plans"
                >
                    <h2 className="mb-3 text-2xl font-semibold">
                        Plans{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className="m-0 max-w-[30ch] text-sm opacity-50">
                        Check out our flexible plans and find the right one for
                        you. No worries, whatever your budget, we&apos;ve got
                        something for everyone.
                    </p>
                </a>

                <a
                    href="/launchpad"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    aria-label="Explore onboarding options"
                >
                    <h2 className="mb-3 text-2xl font-semibold">
                        Onboarding{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className="m-0 max-w-[30ch] text-sm opacity-50">
                        Learn all about the platform, its features, and how to
                        navigate before diving in. Don&apos;t worry, we&apos;ve
                        got an in-app feature for quick help. Just look for the
                        Launchpad in &apos;More&apos; or use the feature finder
                        in the top navigation bar.
                    </p>
                </a>

                <a
                    href="/terms"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    aria-label="Review terms and policies"
                >
                    <h2 className="mb-3 text-2xl font-semibold">
                        Terms and Policies{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className="m-0 max-w-[30ch] text-sm opacity-50">
                        Learn about our terms, conditions, privacy policies, and
                        how we handle user data. Be sure to read it; don’t just
                        skip it like we usually do!
                    </p>
                </a>
            </div>
        </div>
    )
}
