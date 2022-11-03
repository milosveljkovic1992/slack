import { db } from 'firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import { ChannelType } from 'components/channel/channel.types';

export const fetchChannelById = async (
  workplaceId: string,
  channelId: string,
) => {
  const channelRef = doc(db, 'workplaces', workplaceId, 'channels', channelId);
  const channelSnap = await getDoc(channelRef);

  if (channelSnap.exists()) {
    return channelSnap.data() as ChannelType;
  } else {
    throw new Error('Channel not found');
  }
};
