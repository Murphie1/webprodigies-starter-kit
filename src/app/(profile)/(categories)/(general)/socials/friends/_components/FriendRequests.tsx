import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import RequestBox from "./RequestBox";
import { getRequests } from "@/actions/uMessage"; // Fixed syntax error
// import CreateRequest from "./CreateRequest"; // Uncomment if used

export const FriendRequests = async () => {
  const friendRequests = await getRequests(); // Renamed for clarity
  if (!friendRequests) return <p>No friend requests available.</p>;

  return (
    <Drawer>
      <DrawerTrigger className="px-4 py-2 text-sm font-medium transition bg-blue-500 rounded-md text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
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
        {friendRequests.length > 0 ? (
          <div className="flex flex-col space-y-4 p-4">
            {friendRequests.map((friend) => (
              <RequestBox key={friend.id} item={friend} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-center text-gray-500 dark:text-gray-400">
              No requests here
            </p>
          </div>
        )}
        {/* Uncomment below if you want to include CreateRequest */}
        {/* <DrawerFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
          <CreateRequest />
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};
