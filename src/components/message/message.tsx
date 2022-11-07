import { Avatar, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { MessageType } from './message.types';

interface MessageProps {
  message: MessageType;
}

const MessageCard = styled(Grid)(() => ({
  display: 'grid',
  gridTemplateColumns: '36px 1fr',
  gridTemplateAreas: `
      "avatar metadata"
      "avatar body"`,
  columnGap: '4px',
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
        <Avatar
          sx={{
            height: '36px',
            width: '36px',
            borderRadius: '20%',
            marginTop: '6px',
          }}
        >
          {avatarContent}
        </Avatar>
      </Grid>
      <Grid item gridArea="metadata" className="message-meta">
        <b>{message.senderUsername}</b>
        <span style={{ fontSize: '0.75rem', marginLeft: '5px' }}>
          {timestamp}
        </span>
      </Grid>
      <Grid item gridArea="body">
        <p style={{ marginBottom: '0.5rem', marginTop: '0', lineHeight: 1 }}>
          {message.body}
        </p>
      </Grid>
    </MessageCard>
  );
};
