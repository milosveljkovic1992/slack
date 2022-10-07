import type { MessageType } from './message.types';

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  return (
    <li>
      <b>{message.username}</b> {message.body}
    </li>
  );
};
