import { ChangeEvent, FormEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import { Box, TextField } from '@mui/material';

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
  const [messages, setMessages] = useState<MessageType[]>(
    localStorage.getItem('messages')
      ? JSON.parse(localStorage.getItem('messages') || '')
      : [],
  );

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setMessageInput(target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessages((messages) => {
      const newMessages = [
        ...messages,
        {
          messageId: nanoid(),
          username: 'MyLosh',
          channel: 'main thread',
          body: messageInput,
          timestamp: new Date(),
        },
      ];
      localStorage.setItem('messages', JSON.stringify(newMessages));
      return newMessages;
    });
    setMessageInput('');
  };

  return (
    <Box sx={style}>
      <Box className="messages-container" pb={1.5}>
        {messages.map((msg) => (
          <Message key={msg.messageId} message={msg} />
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
