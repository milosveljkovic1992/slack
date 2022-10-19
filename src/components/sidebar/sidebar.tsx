import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

import { Link } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'firebase-config';

import { Box as MUIBox } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { ChannelType } from 'components/channel/channel.types';

const Box = styled(MUIBox)(({ theme }) => ({
  width: '220px',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: '10px 20px',
}));

export const Sidebar = () => {
  const [channels, setChannels] = useState<ChannelType[]>([]);

  const workplaceId = 'mivel';

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
      Channels:
      {channels.map((channel) => (
        <Link key={channel.id} to={channel.id}>
          <p>{channel.name}</p>
        </Link>
      ))}
    </Box>
  );
};
