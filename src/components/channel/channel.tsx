import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { TextField } from '@mui/material';

import { db } from 'firebase-config';
import { RootState, useAppDispatch } from 'store';
import { enterChannel, leaveChannel } from 'store/channel';
import { checkIfUserIsChannelMember } from 'utils/checkIfUserIsChannelMember';
import { fetchChannelById } from 'utils/fetchChannelById';
import { submitMessageToFirebase } from 'utils/submitMessageToFirebase';

import { Message } from 'components';
import {
  ChannelContainer,
  MessageInput,
  MessagesContainer,
} from './channel.styles';
import type { MessageType } from 'components/message/message.types';

export const Channel = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const submitPending = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);

  const workplaceId = useSelector((state: RootState) => state.workplace.id);
  const channelId = useSelector((state: RootState) => state.channel.id);
  const user = useSelector((state: RootState) => state.user);

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setMessageInput(target.value);
  };

  const submitNewMessage = async () => {
    const newMessage = {
      id: nanoid(20),
      senderUsername: 'MyLosh',
      senderId: 'sender1',
      body: messageInput,
      timestamp: new Date(),
    };

    try {
      submitPending.current = true;
      submitMessageToFirebase(workplaceId, channelId, newMessage);
    } catch (error) {
      submitPending.current = false;
      return;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim().length || submitPending.current) return;

    submitNewMessage();
    setMessageInput('');
    submitPending.current = false;
  };

  const scrollToLastMessage = () => {
    const lastChild = listRef.current?.lastElementChild;
    lastChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    const controller = new AbortController();

    const channelParamsId = params['channelId'] as string;
    if (!channelParamsId) return;

    fetch('', { signal: controller.signal })
      .then(() => fetchChannelById(workplaceId, channelParamsId))
      .then((channel) => dispatch(enterChannel(channel)))
      .catch(() => null);

    return () => {
      controller.abort();
      dispatch(leaveChannel());
    };
  }, []);

  useEffect(() => {
    let fetchedMessages: MessageType[] = [];

    if (workplaceId && channelId && user.id) {
      checkIfUserIsChannelMember(workplaceId, channelId, user);
    }

    if (workplaceId && channelId) {
      const messagesRef = collection(
        db,
        'workplaces',
        workplaceId,
        'channels',
        channelId,
        'messages',
      );

      const q = query(messagesRef, orderBy('timestamp', 'asc'));

      const unsubscribeOnChange = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          const singleMessage = change.doc.data() as MessageType;

          if (change.type === 'added') {
            fetchedMessages = [...fetchedMessages, singleMessage];
          }

          if (change.type === 'modified') {
            fetchedMessages = messages.map((msg) =>
              msg.id === singleMessage.id ? singleMessage : msg,
            );
          }

          if (change.type === 'removed') {
            fetchedMessages = messages.filter(
              (msg) => msg.id !== singleMessage.id,
            );
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
  }, [workplaceId, channelId]);

  return (
    <ChannelContainer>
      <MessagesContainer ref={listRef}>
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
      </MessagesContainer>
      <MessageInput>
        <form onSubmit={handleSubmit}>
          <TextField
            id="message-input"
            label="Your message"
            variant="outlined"
            style={{ marginTop: '4px' }}
            fullWidth={true}
            value={messageInput}
            onChange={handleChange}
            autoComplete="off"
          />
        </form>
      </MessageInput>
    </ChannelContainer>
  );
};
