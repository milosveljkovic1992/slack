import type { MessageType } from './message.types';

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  return (
    <div>
      <div className="message-meta">
        <b>{message.username}</b>
        <span style={{ fontSize: '0.75rem', marginLeft: '5px' }}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
      <p style={{ marginBottom: '0.5rem', marginTop: '0.25rem' }}>
        {message.body}
      </p>
    </div>
  );
};
