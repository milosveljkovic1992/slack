import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';
import { Box, TextField } from '@mui/material';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';

import { db } from 'firebase-config';

import { Message } from 'components';
import type { MessageType } from 'components/message/message.types';

const style = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '10px 20px',
};

export const Channel = () => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const submitPending = useRef(false);

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

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: MessageType[] = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data() as MessageType);
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={style}>
      <Box className="messages-container" pb={1.5}>
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
      </Box>
      <Box className="message-input" width="100%" display="block">
        <form onSubmit={handleSubmit}>
          <TextField
            id="message-input"
            label="Your message"
            variant="outlined"
            fullWidth={true}
            value={messageInput}
            onChange={handleChange}
            autoComplete="off"
          />
        </form>
      </Box>
    </Box>
  );
};
