import { Friends } from '@/types/friends';
import Friend from './Friend';

type FriendListProps = {
  friends: Friends[];
  onSelected: (friend: Friends) => void;
  selectedFriend: Friends | null;
};

const FriendList = ({
  friends,
  onSelected,
  selectedFriend,
}: FriendListProps) => (
  <>
    <ul>
      {friends.map((friend) => (
        <Friend
          selectedFriend={selectedFriend}
          onSelected={onSelected}
          key={friend.id}
          friend={friend}
        />
      ))}
    </ul>
  </>
);

export default FriendList;
