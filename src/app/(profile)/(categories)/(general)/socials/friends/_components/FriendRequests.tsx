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
import { getRequests } from @/actions/uMessage";
//import CreateRequest from "./CreateRequest";



const FriendRequests = async () => {

const friendrequest = await getRequests();
  if (!friendrequest) return;
  
  return (
    <Drawer>
  <DrawerTrigger>Friend Requests</DrawerTrigger>
  <DrawerContent className="h-auto max-h-[calc(100vh-50px)] overflow-y-auto">
    <DrawerHeader>
      <DrawerTitle>Your Requests</DrawerTitle>
    </DrawerHeader>
    {friendrequest ? (
      <div className="flex flex-col-1 w-full">
        {friendrequests.map((friend) => (
                    <RequestBox
                        key={friendrequest.id}
                        item={friendrequest}
                    />
        ))}
        
          </div>
    ) : ( 
        <p className="justify-center"> No requests here </p>
      )}
    {/* <DrawerFooter>
      <CreateRequest />
    </DrawerFooter>*/}
  </DrawerContent>
</Drawer>
    
    
  
}
