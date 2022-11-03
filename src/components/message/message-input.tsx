import { ChangeEvent, FormEvent, useRef, useState } from 'react';

import { nanoid } from 'nanoid';
import { TextField } from '@mui/material';

import { submitMessageToFirebase } from 'utils/submitMessageToFirebase';

import { InputElement } from './message-input.styles';

interface MessageInputProps {
  workplaceId: string;
  channelId: string;
}

export const MessageInput = ({ workplaceId, channelId }: MessageInputProps) => {
  const [messageInput, setMessageInput] = useState('');
  const submitPending = useRef(false);

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

  return (
    <InputElement>
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
    </InputElement>
  );
};
