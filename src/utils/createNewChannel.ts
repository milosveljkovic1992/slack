import { db } from 'firebase-config';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

export const createNewChannel = async (workplaceId: string, name: string) => {
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

export const verifyChannelCreated = async (
  workplaceId: string,
  channelId: string,
) => {
  const channelSnap = await getDoc(
    doc(db, 'workplaces', workplaceId, 'channels', channelId),
  );
  if (!channelSnap.exists()) throw new Error('Channel not created');
};
