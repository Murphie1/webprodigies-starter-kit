
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, MessageSquareDiff } from "lucide-react";
import { Id } from "~/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import toast from "react-hot-toast";
import { onAuthenticatedUser } from "@/actions/auth"
import { useConversationStore } from "@/store/chat-store";
import { CreateRequest } from "@/app/(profile)/(categories)/(general)/socials/friends/_components/CreateRequest"


type Props = {
	clerkid: string;
}


const UserListDialog = ({ clerkid }: Props) => {
	//const clerk = await onAuthenticatedUser()
	const [selectedUsers, setSelectedUsers] = useState<Id<"users">[]>([]);
	const [groupName, setGroupName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [renderedImage, setRenderedImage] = useState("");

	const imgRef = useRef<HTMLInputElement>(null);
	const dialogCloseRef = useRef<HTMLButtonElement>(null);

	const createConversation = useMutation(api.conversations.createConversation);
	const generateUploadUrl = useMutation(api.conversations.generateUploadUrl);
	const me = useQuery(api.users.getUserById, clerkid ? {
		clerkId: clerkid!,
	} : "skip"
	 );
	const friends = useQuery(api.friends.getMyFriends, clerkid ? {
  clerkId: clerkid!,
} : "skip"
 );

// Extract the full user details from friendDetails
const users = friends?.map((friend) => friend.friendDetails) || [];
	
	const { setSelectedConversation } = useConversationStore();

	const handleCreateConversation = async () => {
		if (selectedUsers.length === 0) return;
		setIsLoading(true);
		try {
			const isGroup = selectedUsers.length > 1;

		let conversationId;
			if (!isGroup) {
				conversationId = await createConversation({
					participants: [...selectedUsers, me?._id!],
					isGroup: false,
				});
			} else {
				const postUrl = await generateUploadUrl();

				const result = await fetch(postUrl, {
					method: "POST",
					headers: { "Content-Type": selectedImage?.type! },
					body: selectedImage,
				});

				const { storageId } = await result.json();

				conversationId = await createConversation({
					participants: [...selectedUsers, me?._id!],
					isGroup: true,
					admin: me?._id!,
					groupName,
					groupImage: storageId,
				});
			}

			// TODO => Update a global state called "selectedConversation"
			const conversationName = isGroup ? groupName : "Untitled Covno";//users?.find((user) => user._id === selectedUsers[0])?.name! ?? "Untitled Convo";

			setSelectedConversation({
				_id: conversationId,
				participants: [...selectedUsers],//[...selectedUsers, me?._id],
				isGroup,
				image: isGroup ? renderedImage : "https://images.unsplash.com/photo-1606787581180-b40a30072f4d",//users?.find((user) => user._id === selectedUsers[0])?.imageUrl! ?? "https://images.unsplash.com/photo-1606787581180-b40a30072f4d",
				name: conversationName,
				admin: me?._id!,
			});
			dialogCloseRef.current?.click();
			setSelectedUsers([]);
			setGroupName("");
			setSelectedImage(null);
			setIsLoading(false);
		} catch (err) {
			toast.error("Failed to create conversation");
			console.error(err);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!selectedImage) return setRenderedImage("");
		const reader = new FileReader();
		reader.onload = (e) => setRenderedImage(e.target?.result as string);
		reader.readAsDataURL(selectedImage);
	}, [selectedImage]);

	return (
		<Dialog>
			<DialogTrigger>
				<MessageSquareDiff size={20} />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					{/* TODO: <DialogClose /> will be here */}
					<DialogClose ref={dialogCloseRef} />
					<DialogTitle>Friends</DialogTitle>
				</DialogHeader>

				<DialogDescription>Start a new chat</DialogDescription>
				{renderedImage && (
					<div className='w-16 h-16 relative mx-auto'>
						<Image src={renderedImage} fill alt='user image' className='rounded-full object-cover' />
					</div>
				)}
				{/* TODO: input file */}
				<input
					type='file'
					accept='image/*'
					ref={imgRef}
					hidden
					onChange={(e) => setSelectedImage(e.target.files![0])}
				/>
				{selectedUsers.length > 1 && (
					<>
						<Input
							placeholder='Group Name'
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
						/>
						<Button className='flex gap-2' onClick={() => imgRef.current?.click()}>
							<ImageIcon size={20} />
							Group Image
						</Button>
					</>
				)}
				<div className='flex flex-col gap-3 overflow-auto max-h-60'>
    {users?.map((user, index) =>
        user ? (
            <div
                key={user._id} // Ensure this is unique for each user
                className={`flex gap-3 items-center p-2 rounded cursor-pointer active:scale-95 
                    transition-all ease-in-out duration-300
                ${selectedUsers.includes(user._id) ? "bg-green-primary" : ""}`}
                onClick={() => {
                    if (selectedUsers.includes(user._id)) {
                        setSelectedUsers(selectedUsers.filter((id) => id !== user._id));
                    } else {
                        setSelectedUsers([...selectedUsers, user._id]);
                    }
                }}
            >
                <Avatar className='overflow-visible'>
                    {user.isOnline && (
                        <div className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground' />
                    )}
                    <AvatarImage
                        src={user.imageUrl || "https://images.unsplash.com/photo-1606787581180-b40a30072f4d"}
                        className='rounded-full object-cover'
                    />
                    <AvatarFallback>
                        <div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full'></div>
                    </AvatarFallback>
                </Avatar>
                <div className='w-full '>
                    <div className='flex items-center justify-between'>
                        <p className='text-md font-medium'>{user.name || user.email.split("@")[0] || "Unnamed"}</p>
                    </div>
                </div>
            </div>
        ) : (
		<div 
			key={`async-create-${index}`}
			className="flex flex-1 gap-x-2 text-semibold"
			>
            <CreateRequest clerkstring={clerkid} />
			Add a Friend to Continue
			</div>
        )
    )}
</div>
				<div className='flex justify-between'>
					<Button variant={"outline"}>Cancel</Button>
					<Button
						onClick={handleCreateConversation}
						disabled={selectedUsers.length === 0 || (selectedUsers.length > 1 && !groupName) || isLoading}
					>
						{/* spinner */}
						{isLoading ? (
							<div className='w-5 h-5 border-t-2 border-b-2  rounded-full animate-spin' />
						) : (
							"Create"
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default UserListDialog;
										
