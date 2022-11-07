import { doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from 'firebase-config';
import { userJoinedNotification } from './userJoinedNotification';
import { UserType } from 'store/user';

// prettier-ignore
export const checkIfUserIsChannelMember = async (
  workplaceId: string,
  channelId: string,
  channelName: string,
  user: UserType,
) => {
  const usersRef = doc(db, 'workplaces', workplaceId, 'channels', channelId, 'users', user.id);
  const docSnap = await getDoc(usersRef);
  const isMember = docSnap.exists();

  if (!isMember) {
    await setDoc(usersRef, user);
    await userJoinedNotification( workplaceId, channelId, channelName, user);
  }
};
