import { ChangeEvent, FormEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import { Box, TextField } from '@mui/material';

const style = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '10px 20px',
};

type Message = {
  messageId: string;
  username: string;
  channel: string;
  body: string;
};

export const Channel = () => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(
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
        },
      ];
      localStorage.setItem('messages', JSON.stringify(newMessages));
      return newMessages;
    });
    setMessageInput('');
  };

  return (
    <Box sx={style}>
      <div className="messages-container">
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {messages.map((msg) => (
            <li key={msg.messageId}>
              <b>{msg.username}</b> {msg.body}
            </li>
          ))}
        </ul>
      </div>
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
