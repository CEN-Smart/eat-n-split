'use client';

import { Avatar, Flex } from '@chakra-ui/react';
import Btn from '../ui/Btn';
import { Friends } from '@/types/friends';
import { cn } from '@/lib/utils';

type FriendProps = {
  friend: Friends;
  onSelected: (friend: Friends) => void;
  selectedFriend: Friends | null;
};
const Friend = ({ friend, onSelected, selectedFriend }: FriendProps) => (
  <>
    <li
      className={cn(`flex list-none gap-8 items-center p-4`, {
        'bg-rose-100': selectedFriend && selectedFriend.id === friend.id,
      })}
    >
      <Avatar src={friend.image} />
      <div>
        <p className='font-[700]'>{friend.name}</p>
        <p
          className={cn(` text-sm`, {
            'text-red-500': friend.balance && friend.balance < 0,
            'text-green-500': friend.balance && friend.balance > 0,
            'text-gray-500': friend.balance === 0 || !friend.balance,
          })}
        >
          {friend.balance && friend.balance < 0
            ? `You owe ${friend.name} ${Math.abs(friend.balance)}€`
            : friend.balance === 0
            ? `You and ${friend.name} are tied`
            : `${friend.name} owes you ${friend.balance}€`}
        </p>
      </div>
      <Btn onClick={() => onSelected(friend)} className='ml-auto' type='button'>
        {selectedFriend && selectedFriend.id === friend.id ? 'Close' : 'Select'}
      </Btn>
    </li>
  </>
);

export default Friend;
