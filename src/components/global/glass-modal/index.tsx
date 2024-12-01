import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type GlassModalProps = {
    trigger: JSX.Element
    children: React.ReactNode
    title: string
    description: string
}

export const GlassModal = ({
    trigger,
    children,
    title,
    description,
}: GlassModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="bg-white dark:bg-themeBlack border-black dark:border-themeGray bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl bg-opacity-100">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
