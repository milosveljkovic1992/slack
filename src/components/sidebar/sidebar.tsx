import { MouseEvent, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

import { useParams } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'firebase-config';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { enterChannel } from 'store/channel';

import { styled } from '@mui/material/styles';
import { Box as MUIBox, Link as MUILink } from '@mui/material';
import { HiHashtag } from 'react-icons/hi';
import { BsFillPlusSquareFill } from 'react-icons/bs';

import { SidebarChannel } from './sidebar-channel';
import { CreateChannelModal } from 'components';
import type { ChannelType } from 'components/channel/channel.types';

const Link = styled(MUILink)(({ theme }) => ({
  color: '#fff',
  display: 'block',

  '&:hover, &:focus': {
    backgroundColor: theme.palette.primary.dark,
  },

  '&.active': {
    backgroundColor: '#1164A3',
  },
}));

const Box = styled(MUIBox)(({ theme }) => ({
  minWidth: '220px',
  width: 'auto',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,

  '& > *': {
    padding: '0 15px',
  },
}));

export const Sidebar = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
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

  const handleClick = (channel: ChannelType) => {
    if (channel.id !== params['channelId']) dispatch(enterChannel(channel));
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
      <Box>
        <p>Channels:</p>
        {channels.map((channel) => (
          <Link
            key={channel.id}
            href={channel.id}
            onClick={() => handleClick(channel)}
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
      </Box>
      <CreateChannelModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleBackgroundClick={handleBackgroundClick}
      />
    </>
  );
};
