import { db } from 'firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { UserType } from 'store/user';
import { submitUserToChannel } from './submitUserToChannel';

export const checkIfUserIsChannelMember = async (
  workplaceId: string,
  channelId: string,
  user: UserType,
) => {
  const usersRef = doc(
    db,
    'workplaces',
    workplaceId,
    'channels',
    channelId,
    'users',
    user.id,
  );

  const docSnap = await getDoc(usersRef);

  if (!docSnap.exists())
    await submitUserToChannel(workplaceId, channelId, user);
};
