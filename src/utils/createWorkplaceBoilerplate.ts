import { db } from 'firebase-config';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
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
  const createdChannel = await getDoc(
    doc(db, 'workplaces', workplaceId, 'channels', channelId),
  );
  const isCreated = !!createdChannel.data()?.id;
  return isCreated;
};

const createUsersCollection = async (
  workplaceId: string,
  channelId: string,
  user: UserType,
) => {
  // prettier-ignore
  try {
    const userRef = doc(db, 'workplaces', workplaceId, 'channels', channelId, 'users', user.id)
    await setDoc(userRef, { user });
  } catch (error) {
    return error
  }
};

const verifyUsersCollectionCreated = async (
  workplaceId: string,
  channelId: string,
  userId: string,
) => {
  // prettier-ignore
  const createdUser = await getDoc(
    doc(db, 'workplaces', workplaceId, 'channels', channelId, 'users', userId),
  );
  const isCreated = !!createdUser.data()?.id;
  return isCreated;
};

// prettier-ignore
const createMessagesCollection = async (
  workplaceId: string,
  channelId: string,
  channelName: string,
  user: UserType,
) => {
  const messagesCollection = collection(db, 'workplaces', workplaceId, 'channels', channelId, 'messages')
  
  const messagesRef = await addDoc(messagesCollection, {
    type: 'notification',
    body: `${user.username} created "${channelName}"`,
    timestamp: new Date(),
  });
  
  const messagesDoc = doc(db, 'workplaces', workplaceId, 'channels', channelId, 'messages', messagesRef.id)
  await setDoc(messagesDoc, { id: messagesRef.id }, { merge: true });
  return messagesRef.id;
};

// prettier-ignore
const verifyIsMessagesCollectionCreated = async(workplaceId: string, channelId: string, messageId: string) => {
  const createdMessage = await getDoc(
    doc(db, 'workplaces', workplaceId, 'channels', channelId, 'messages', messageId),
  );
  const isCreated = !!createdMessage.data()?.id;
  return isCreated;
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
      const isChannelCreated = await verifyChannelCreated(
        workplaceId,
        channelId,
      );
      if (!isChannelCreated) throw 'Channel not created';

      await createUsersCollection(workplaceId, channelId, user);
      const isUsersCollectionCreated = verifyUsersCollectionCreated(
        workplaceId,
        channelId,
        user.id,
      );
      if (!isUsersCollectionCreated) throw 'Users collection not created';

      const messageId = await createMessagesCollection(workplaceId, channelId, channel, user);
      const isMessagesCollectionCreated = await verifyIsMessagesCollectionCreated(workplaceId, channelId, messageId);
      if (!isMessagesCollectionCreated) throw 'Messages collection not created'
      
    }
  } catch (error) {
    return error
  }
};
