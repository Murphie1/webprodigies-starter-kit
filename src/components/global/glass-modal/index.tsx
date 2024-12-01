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
            <DialogContent className="bg-clip-padding dark:backdrop-filter dark:backdrop--blur__safari dark:backdrop-blur-3xl bg-opacity-20 bg-white dark:bg-themeBlack border-black dark:border-themeGray">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
