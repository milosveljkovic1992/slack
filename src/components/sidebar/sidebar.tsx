import { MouseEvent, useEffect, useState } from 'react';

import { flushSync } from 'react-dom';
import { useSelector } from 'react-redux';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { HiHashtag } from 'react-icons/hi';
import { BsFillPlusSquareFill } from 'react-icons/bs';

import { db } from 'firebase-config';
import { RootState } from 'store';

import { SidebarChannel } from './sidebar-channel';
import { CreateChannelModal } from 'components';
import { Link, SidebarContainer } from './sidebar.styles';
import type { ChannelType } from 'components/channel/channel.types';

export const Sidebar = () => {
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const channelId = useSelector((state: RootState) => state.channel.id);
  const workplaceId = useSelector((state: RootState) => state.workplace.id);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackgroundClick = (e: MouseEvent) => {
    const target = e.target as Element;
    if (target.closest('.inner-container')) return;

    closeModal();
  };

  useEffect(() => {
    const q = query(
      collection(db, 'workplaces', workplaceId, 'channels'),
      orderBy('id', 'asc'),
    );

    let fetchedChannels: ChannelType[] = [];

    const unsubscribeOnChange = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const singleChannel = change.doc.data() as ChannelType;
        switch (change.type) {
          case 'added':
            fetchedChannels = [...fetchedChannels, singleChannel];
            break;
          case 'modified':
            fetchedChannels = fetchedChannels.map((channel) =>
              channel.id === singleChannel.id ? singleChannel : channel,
            );
            break;
          case 'removed':
            fetchedChannels = channels.filter(
              (channel) => channel.id !== singleChannel.id,
            );
            break;
        }
      });

      flushSync(() => {
        setChannels(fetchedChannels);
      });
    });

    return () => unsubscribeOnChange();
  }, []);

  return (
    <>
      <SidebarContainer>
        <p>Channels:</p>
        {channels.map((channel) => (
          <Link
            key={channel.id}
            href={channel.id}
            className={channelId === channel.id ? 'active' : ''}
          >
            <SidebarChannel icon={<HiHashtag />}>{channel.name}</SidebarChannel>
          </Link>
        ))}
        <Link className="add-channel-button" onClick={openModal}>
          <SidebarChannel icon={<BsFillPlusSquareFill />}>
            Add channels
          </SidebarChannel>
        </Link>
      </SidebarContainer>
      <CreateChannelModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleBackgroundClick={handleBackgroundClick}
      />
    </>
  );
};
