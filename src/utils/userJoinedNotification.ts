// prettier-ignore
import { nanoid } from 'nanoid';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

import { db } from 'firebase-config';
import { UserType } from 'store/user';

// prettier-ignore
export const userJoinedNotification = async (
  workplaceId: string,
  channelId: string,
  channelName: string,
  user: UserType,
) => {
  const id = nanoid(20);
  const notificationMessage = {
    id,
    senderUsername: user.username,
    senderId: user.id,
    body: `${user.username} joined "${channelName}"`,
    timestamp: new Date(),
  };

  const messagesCollection = collection(db, 'workplaces', workplaceId, 'channels', channelId, 'messages');
  const messageRef = await addDoc(messagesCollection, notificationMessage);

  const messageDoc = doc(db, 'workplaces', workplaceId, 'channels', channelId, 'messages', messageRef.id)
  await setDoc(messageDoc, { id: messageRef.id }, { merge: true });
};
