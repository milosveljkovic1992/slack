import { db } from 'firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { UserType } from 'store/user';

export const submitUserToChannel = async (
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

  await setDoc(usersRef, user);
};
