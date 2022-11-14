import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { db } from 'firebase-config';
import { RootState, useAppDispatch } from 'store';
import { enterChannel, leaveChannel } from 'store/channel';
import { checkIfUserIsChannelMember } from 'utils/checkIfUserIsChannelMember';
import { fetchChannelById } from 'utils/fetchChannelById';

import { SingleMessage, MessageInput } from 'components';
import { ChannelContainer, MessagesContainer } from './channel.styles';
import type { MessageType } from 'components/message/message.types';

export const Channel = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const [messages, setMessages] = useState<MessageType[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  const { workplace, channel, user } = useSelector((state: RootState) => state);

  const scrollToLastMessage = () => {
    const lastChild = listRef.current?.lastElementChild;
    lastChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    const controller = new AbortController();

    const channelParamsId = params['channelId'] as string;
    if (!channelParamsId) return;

    fetch('', { signal: controller.signal })
      .then(() => fetchChannelById(workplace.id, channelParamsId))
      .then((channel) => dispatch(enterChannel(channel)))
      .catch(() => null);

    return () => {
      controller.abort();
      dispatch(leaveChannel());
    };
  }, [params['channelId']]);

  useEffect(() => {
    let fetchedMessages: MessageType[] = [];

    if (workplace.id && channel.id && user.id) {
      checkIfUserIsChannelMember(workplace.id, channel.id, channel.name, user);
    }

    if (workplace.id && channel.id) {
      const messagesRef = collection(
        db,
        'workplaces',
        workplace.id,
        'channels',
        channel.id,
        'messages',
      );

      const q = query(messagesRef, orderBy('timestamp', 'asc'));

      const unsubscribeOnChange = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          const singleMessage = change.doc.data() as MessageType;

          switch (change.type) {
            case 'added': {
              fetchedMessages = [...fetchedMessages, singleMessage];
              break;
            }
            // case 'modified': {
            //     fetchedMessages = messages.map((msg) =>
            //       msg.id === singleMessage.id ? singleMessage : msg,
            //     );
            // }
            // case 'removed': {
            //   fetchedMessages = messages.filter(
            //     (msg) => msg.id !== singleMessage.id,
            //   );
            //   break;
            // }
          }
        });

        flushSync(() => {
          setMessages(fetchedMessages);
        });

        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') scrollToLastMessage();
        });
      });

      return () => unsubscribeOnChange();
    }
  }, [workplace.id, channel.id]);

  return (
    <ChannelContainer>
      <MessagesContainer ref={listRef}>
        {messages.map((msg) => (
          <SingleMessage key={msg.id} message={msg} />
        ))}
      </MessagesContainer>
      <MessageInput workplaceId={workplace.id} channelId={channel.id} />
    </ChannelContainer>
  );
};
