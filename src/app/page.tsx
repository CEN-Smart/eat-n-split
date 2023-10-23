'use client';
import { use, useCallback, useState } from 'react';
import AddFriendForm from '@/components/eat-n-split/AddFriendForm';
import FriendList from '@/components/eat-n-split/FriendList';
import SplitBillForm from '@/components/eat-n-split/SplitBillForm';
import Btn from '@/components/ui/Btn';
import { Friends } from '@/types/friends';

const initialFriends: Friends[] = [
  {
    id: crypto.randomUUID(),
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: crypto.randomUUID(),
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 100,
  },
  {
    id: crypto.randomUUID(),
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

const Home = () => {
  const [friends, setFriends] = useState<Friends[]>([]);
  const [friendForm, setFriendForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friends | null>(null);
  const handleShowFriendForm = useCallback(() => {
    setFriendForm((show) => !show);
  }, []);

  const handleAddFriend = useCallback(
    (friend: Friends) => {
      setFriends((friends) => [...friends, friend]);
      setFriendForm(false);
    },
    [setFriends, setFriendForm]
  );

  const handleSelectedFriend = useCallback(
    (friend: Friends) => {
      setSelectedFriend((selected) =>
        selected?.id === friend.id ? null : friend
      );
      setFriendForm(false);
    },
    [setSelectedFriend, setFriendForm]
  );

  const handleSplitBill = useCallback(
    (value: number | string) => {
      setFriends((friends) =>
        friends.map((friend) =>
          friend.id === selectedFriend?.id
            ? {
                ...friend,
                balance: Number(friend.balance) + Number(value),
              }
            : friend
        )
      );
      setSelectedFriend(null);
    },
    [setSelectedFriend, selectedFriend, setFriends]
  );

  return (
    <>
      <main className='mx-auto mt-20 my-6  p-4'>
        <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <aside className='w-full flex flex-col gap-4'>
            <FriendList
              selectedFriend={selectedFriend}
              onSelected={handleSelectedFriend}
              friends={friends}
            />
            {friendForm && <AddFriendForm onAddFriend={handleAddFriend} />}
            {friends.length >= 0 && (
              <Btn onClick={handleShowFriendForm} className='ml-auto mr-4'>
                {friendForm ? 'Close' : 'Add Friend'}
              </Btn>
            )}
          </aside>
          <div className='w-full'>
            {selectedFriend && (
              <SplitBillForm
                onSplitBill={handleSplitBill}
                selectedFriend={selectedFriend}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
