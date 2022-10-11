import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Box, TextField } from '@mui/material';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

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

  const fetchMessages = async () => {
    const messages: MessageType[] = [];
    const querySnapshot = await getDocs(
      collection(
        db,
        'workplaces',
        'g95Hrl87ilfXgTwYOXl1',
        'channels',
        'flFPHVKyKkEEvmxcs3GA',
        'messages',
      ),
    );

    querySnapshot.forEach((doc) => {
      messages.push(doc.data() as MessageType);
    });

    setMessages(messages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setMessageInput(target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newMessage = {
      id: nanoid(20),
      senderUsername: 'MyLosh',
      senderId: 'sender1',
      body: messageInput,
      timestamp: new Date(),
    };

    try {
      await setDoc(
        doc(
          db,
          'workplaces',
          'g95Hrl87ilfXgTwYOXl1',
          'channels',
          'flFPHVKyKkEEvmxcs3GA',
          'messages',
          newMessage.id,
        ),
        newMessage,
      );
    } catch (error) {
      return;
    }

    setMessages((messages) => [...messages, newMessage]);

    setMessageInput('');
  };

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
