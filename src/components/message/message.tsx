import { Avatar, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { MessageType } from './message.types';

interface MessageProps {
  message: MessageType;
}

const MessageCard = styled(Card)(() => ({
  border: 0,
  boxShadow: 'none',
}));

export const Message = ({ message }: MessageProps) => {
  const timestamp = message.timestamp.seconds
    ? new Date(message.timestamp.seconds * 1000).toLocaleTimeString()
    : '';

  const avatarContent = message.senderUsername
    ? message.senderUsername
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
    : 'N';

  return (
    <MessageCard>
      <Avatar>{avatarContent}</Avatar>
      <div className="message-meta">
        <b>{message.senderUsername}</b>
        <span style={{ fontSize: '0.75rem', marginLeft: '5px' }}>
          {timestamp}
        </span>
      </div>
      <p style={{ marginBottom: '0.5rem', marginTop: '0.25rem' }}>
        {message.body}
      </p>
    </MessageCard>
  );
};
