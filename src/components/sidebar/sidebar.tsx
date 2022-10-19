import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'firebase-config';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { enterChannel } from 'store/channel';

import { styled } from '@mui/material/styles';
import { Box as MUIBox, Link as MUILink } from '@mui/material';

import type { ChannelType } from 'components/channel/channel.types';

const Link = styled(MUILink)(() => ({
  color: '#fff',
  display: 'block',

  '&:hover': {
    opacity: 0.8,
  },
}));

const Box = styled(MUIBox)(({ theme }) => ({
  width: '220px',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: '10px 20px',
}));

export const Sidebar = () => {
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const dispatch = useAppDispatch();

  const channelId = useSelector((state: RootState) => state.channel.id);
  const workplaceId = useSelector((state: RootState) => state.workplace.id);

  const handleClick = (channel: ChannelType) => {
    if (channel.id !== channelId) dispatch(enterChannel(channel));
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

        if (change.type === 'added') {
          fetchedChannels = [...fetchedChannels, singleChannel];
        }

        if (change.type === 'modified') {
          fetchedChannels = channels.map((channel) =>
            channel.id === singleChannel.id ? singleChannel : channel,
          );
        }

        if (change.type === 'removed') {
          fetchedChannels = channels.filter(
            (channel) => channel.id !== singleChannel.id,
          );
        }
      });

      flushSync(() => {
        setChannels(fetchedChannels);
      });
    });

    return () => unsubscribeOnChange();
  }, []);

  return (
    <Box>
      <p>Channels:</p>
      {channels.map((channel) => (
        <Link
          key={channel.id}
          href={channel.id}
          onClick={() => handleClick(channel)}
        >
          # {channel.name}
        </Link>
      ))}
    </Box>
  );
};
