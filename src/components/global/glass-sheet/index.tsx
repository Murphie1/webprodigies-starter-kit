import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type GlassSheetProps = {
    children: React.ReactNode
    trigger: React.ReactNode
    className?: string
    triggerClass?: string
}

const GlassSheet = ({
    children,
    trigger,
    className,
    triggerClass,
}: GlassSheetProps) => {
    return (
        <Sheet>
            <SheetTrigger className={cn(triggerClass)} asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent
                className={cn(
                    "bg-clip-padding dark:backdrop-filter dark:backdrop--blur__safari dark:backdrop-blur-3xl bg-opacity-20 bg-white dark:bg-themeBlack border-white dark:border-themeBlack",
                    className,
                )}
            >
                {children}
            </SheetContent>
        </Sheet>
    )
}

export default GlassSheet
