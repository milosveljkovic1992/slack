import { MessageType } from 'components/message/message.types';
import { db } from 'firebase-config';
import { doc, setDoc } from 'firebase/firestore';

export const submitMessageToFirebase = async (
  workplaceId: string,
  channelId: string,
  message: MessageType,
) => {
  await setDoc(
    doc(
      db,
      'workplaces',
      workplaceId,
      'channels',
      channelId,
      'messages',
      message.id,
    ),
    message,
  );
};
