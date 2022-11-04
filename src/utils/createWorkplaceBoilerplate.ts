import { db } from 'firebase-config';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { UserType } from 'store/user';

const createChannel = async (workplaceId: string, name: string) => {
  // create channel with firebase id
  // prettier-ignore
  const channelCollection = collection(db, 'workplaces', workplaceId, 'channels')
  const channelRef = await addDoc(channelCollection, { name });

  // add id property to channel
  // prettier-ignore
  const channelDoc = doc(db, 'workplaces', workplaceId, 'channels', channelRef.id)
  await setDoc(channelDoc, { id: channelRef.id }, { merge: true });
  return channelRef.id;
};

const verifyChannelCreated = async (workplaceId: string, channelId: string) => {
  const channelSnap = await getDoc(
    doc(db, 'workplaces', workplaceId, 'channels', channelId),
  );
  if (!channelSnap.exists()) throw new Error('Channel not created');
};

const createUsersCollection = async (
  workplaceId: string,
  channelId: string,
  user: UserType,
) => {
  // prettier-ignore
  const userRef = doc(db, 'workplaces', workplaceId, 'channels', channelId, 'users', user.id)
  await setDoc(userRef, { user });
};

const verifyUsersCollectionCreated = async (
  workplaceId: string,
  channelId: string,
  userId: string,
) => {
  // prettier-ignore
  const userSnapshot = await getDoc(
    doc(db, 'workplaces', workplaceId, 'channels', channelId, 'users', userId),
  );
  if (!userSnapshot.exists()) throw new Error('User collection not created');
};

// prettier-ignore
const createMessagesCollection = async (
  workplaceId: string,
  channelId: string,
  channelName: string,
  user: UserType,
) => {
  const notificationMessage = {
      id: nanoid(20),
      senderUsername: user.username,
      senderId: user.id,
      body: `${user.username} joined "${channelName}"`,
      timestamp: new Date(),
  }
  const messagesCollection = collection(db, 'workplaces', workplaceId, 'channels', channelId, 'messages')
  const messagesRef = await addDoc(messagesCollection, notificationMessage);
  return messagesRef.id;
};

// prettier-ignore
const verifyIsMessagesCollectionCreated = async(workplaceId: string, channelId: string, messageId: string) => {
  const messageSnapshot = await getDoc(
    doc(db, 'workplaces', workplaceId, 'channels', channelId, 'messages', messageId),
  );
  if (!messageSnapshot.exists()) throw new Error('Messages collection not created');
}

// prettier-ignore
export const createWorkplaceBoilerplate = async (
  workplaceId: string,
  user: UserType,
) => {
  const boilerplateChannels = ['general', 'announcements'];
  try {
    for (const channel of boilerplateChannels) {
      const channelId = await createChannel(workplaceId, channel);
      await verifyChannelCreated(workplaceId, channelId);

      await createUsersCollection(workplaceId, channelId, user);
      await verifyUsersCollectionCreated(workplaceId, channelId, user.id);

      const messageId = await createMessagesCollection(workplaceId, channelId, channel, user);
      await verifyIsMessagesCollectionCreated(workplaceId, channelId, messageId);
    }
  } catch (error) {
    if (error) throw error
  }
};
