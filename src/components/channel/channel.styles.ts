import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ChannelContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  maxHeight: '95vh',
}));

export const MessagesContainer = styled(Box)(() => ({
  padding: '10px 20px 0',
  overflowY: 'auto',
}));

export const MessageInput = styled(Box)(() => ({
  width: '100%',
  display: 'block',
}));
