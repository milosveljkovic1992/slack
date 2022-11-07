import { Avatar, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { MessageType } from './message.types';

interface MessageProps {
  message: MessageType;
}

const MessageCard = styled(Grid)(() => ({
  border: '1px solid red',
  gridTemplateAreas: `"avatar metadata"
        "avatar body"`,
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
    <MessageCard container>
      <Grid item gridArea="avatar">
        <Avatar>{avatarContent}</Avatar>
      </Grid>
      <Grid item width="100%" gridArea="metadata">
        <div className="message-meta">
          <b>{message.senderUsername}</b>
          <span style={{ fontSize: '0.75rem', marginLeft: '5px' }}>
            {timestamp}
          </span>
        </div>
        <Grid item gridArea="body">
          <p style={{ marginBottom: '0.5rem', marginTop: '0.25rem' }}>
            {message.body}
          </p>
        </Grid>
      </Grid>
    </MessageCard>
  );
};
