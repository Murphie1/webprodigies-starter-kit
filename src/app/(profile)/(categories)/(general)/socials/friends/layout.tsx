import { getFriends } from '@/actions/uMessage';
import Sidebar from '@/components/uMessage/sidebar/Sidebar';
import FriendList from './_components/FriendList';

export default async function FriendsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const friends = await getFriends();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <FriendList items={friends} />
        {children}
      </div>
    </Sidebar>
  )
};
