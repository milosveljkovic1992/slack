import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { nanoid } from 'nanoid';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { db } from 'firebase-config';

import { Message, NewUser } from 'components';
import type { MessageType } from 'components/message/message.types';

const ChannelContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  maxHeight: '95vh',
}));

const MessagesContainer = styled(Box)(() => ({
  padding: '10px 20px 0',
  overflowY: 'auto',
}));

const MessageInput = styled(Box)(() => ({
  width: '100%',
  display: 'block',
}));

export const Channel = () => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const submitPending = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);

  const workplaceId = 'g95Hrl87ilfXgTwYOXl1';
  const channelId = 'flFPHVKyKkEEvmxcs3GA';

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setMessageInput(target.value);
  };

  const submitMessageToFirebase = async () => {
    const newMessage = {
      id: nanoid(20),
      senderUsername: 'MyLosh',
      senderId: 'sender1',
      body: messageInput,
      timestamp: new Date(),
    };

    try {
      submitPending.current = true;

      await setDoc(
        doc(
          db,
          'workplaces',
          workplaceId,
          'channels',
          channelId,
          'messages',
          newMessage.id,
        ),
        newMessage,
      );
    } catch (error) {
      submitPending.current = false;
      return;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim().length || submitPending.current) return;

    submitMessageToFirebase();
    setMessageInput('');
    submitPending.current = false;
  };

  useEffect(() => {
    const scrollToLastMessage = () => {
      const lastChild = listRef.current?.lastElementChild;
      lastChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const q = query(
      collection(
        db,
        'workplaces',
        workplaceId,
        'channels',
        channelId,
        'messages',
      ),
      orderBy('timestamp', 'asc'),
    );

    let fetchedMessages: MessageType[] = [];

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
  }, []);

  return (
    <ChannelContainer>
      <NewUser />
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
