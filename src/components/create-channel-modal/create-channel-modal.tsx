import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from '@mui/material';

import { useAppDispatch } from 'store';
import { resolveRequest, submitRequest } from 'store/request';
import { createNewChannel } from 'utils/createNewChannel';
import { CreateChannelModalProps } from './create-channel-modal.types';

let inputInitiated = false;

export const CreateChannelModal = ({
  isOpen,
  closeModal,
  handleBackgroundClick,
}: CreateChannelModalProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [channelName, setChannelName] = useState<string>('');
  const [error, setError] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const submitPending = useRef(false);

  const parseInput = (input: string) => {
    return input.toLowerCase().replace(/\s/g, '-');
  };

  const handleChange = (e: ChangeEvent) => {
    inputInitiated = true;
    const target = e.target as HTMLInputElement;
    setChannelName(parseInput(target.value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const workplaceId = params['workplaceId'];
    const channelName = inputRef.current?.value;
    const startsWithCharacter = !!channelName && !!channelName.match(/^\w/i);
    const hasPunctuation = !!channelName && channelName.match(/[^\w\s-]|_/gi);

    if (!startsWithCharacter) {
      setError('Channel name must start with a letter or a number');
    } else if (hasPunctuation) {
      setError(`Channel names can’t contain spaces, periods, or most punctuation. 
      Try again?`);
    } else {
      if (workplaceId && channelName && !submitPending.current) {
        submitPending.current = true;
        dispatch(submitRequest());
        const newChannelId = await createNewChannel(workplaceId, channelName);
        dispatch(resolveRequest());
        navigate(`${newChannelId}`);
        closeModal();
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      submitPending.current = false;
      inputInitiated = false;
      setChannelName('');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (inputInitiated) {
      const startsWithCharacter = !!channelName && !!channelName.match(/^\w/i);
      const hasPunctuation = !!channelName && channelName.match(/[^\w\s-]|_/gi);

      if (!startsWithCharacter) {
        setError('Channel name must start with a letter or a number');
      } else if (hasPunctuation) {
        setError(
          `Channel names can’t contain spaces, periods, or most punctuation.`,
        );
      } else {
        setError('');
      }
    }
  }, [channelName]);

  return (
    <Dialog open={isOpen} onClick={handleBackgroundClick}>
      <DialogContent
        sx={{ width: 'auto', maxWidth: '440px', padding: '20px 40px' }}
        className="inner-container"
      >
        <DialogTitle pl={[0]} variant="h4" fontWeight={600} letterSpacing={-1}>
          Create a channel
        </DialogTitle>
        <DialogContentText mb={2}>
          Channels are where your team communicates. They’re best when organized
          around a topic — #marketing, for example.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="channel-name-input"
            style={{ fontSize: '0.875rem', fontWeight: 600 }}
          >
            Name
            {error && (
              <span style={{ color: 'red', display: 'block' }}>{error}</span>
            )}
          </label>
          <Input
            autoFocus={true}
            id="channel-name-input"
            type="text"
            inputRef={inputRef}
            value={channelName}
            onChange={handleChange}
            fullWidth
          ></Input>

          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" disabled={!!error}>
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
