"use client"

import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { useJoinGroup } from "@/hooks/payment"

import { CardElement } from "@stripe/react-stripe-js"

type JoinGroupPaymentFormProps = {
    groupid: string
}

export const JoinGroupPaymentForm = ({
    groupid,
}: JoinGroupPaymentFormProps) => {
    const { isPending, onPayToJoin } = useJoinGroup(groupid)
    return (
        <div className="flex flex-col gap-y-3">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#F2F2F2",
                            "::placeholder": {
                                color: "#F2F2F2",
                            },
                        },
                    },
                }}
                className="bg-white dark:bg-themeBlack border-[1px] border-black dark:border-themeGray outline-none rounded-lg p-3"
            />
            <Button onClick={onPayToJoin}>
                <Loader loading={isPending}>Pay Now</Loader>
            </Button>
        </div>
    )
}
