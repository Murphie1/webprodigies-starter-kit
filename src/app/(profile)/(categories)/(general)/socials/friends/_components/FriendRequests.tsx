import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import  AsyncCreateRequest from "./AsyncCreateRequest"

// Component accepts requests as a prop (server-side fetched)
export const FriendRequests = async () => {
    return (
        <Drawer>
            <DrawerTrigger className="px-4 py-2 w-40 md:w-56 justify-center text-sm font-medium transition bg-blue-500 rounded-md text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                Friend Requests
            </DrawerTrigger>
            <DrawerContent className="h-auto max-h-[calc(100vh-50px)] overflow-y-auto bg-white dark:bg-gray-900 text-black dark:text-gray-100 shadow-lg">
                <DrawerHeader>
                    <DrawerTitle className="text-xl font-semibold">
                        Your Requests
                    </DrawerTitle>
                    <DrawerDescription className="text-sm text-gray-600 dark:text-gray-400">
                        Check and manage your friend requests.
                    </DrawerDescription>
                </DrawerHeader>
                Friend Requests Go Here
                <DrawerFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <AsyncCreateRequest />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
