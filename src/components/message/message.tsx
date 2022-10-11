import type { MessageType } from './message.types';

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  const timestamp = message.timestamp.seconds
    ? new Date(message.timestamp.seconds * 1000).toLocaleTimeString()
    : new Date(message.timestamp).toLocaleTimeString();

  return (
    <div>
      <div className="message-meta">
        <b>{message.senderUsername}</b>
        <span style={{ fontSize: '0.75rem', marginLeft: '5px' }}>
          {timestamp}
        </span>
      </div>
      <p style={{ marginBottom: '0.5rem', marginTop: '0.25rem' }}>
        {message.body}
      </p>
    </div>
  );
};
