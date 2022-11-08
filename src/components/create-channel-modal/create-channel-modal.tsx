import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from '@mui/material';

import { createNewChannel } from 'utils/createNewChannel';
import { CreateChannelModalProps } from './create-channel-modal.types';

export const CreateChannelModal = ({
  isOpen,
  closeModal,
  handleBackgroundClick,
}: CreateChannelModalProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState('');
  const [error, setError] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const submitPending = useRef(false);

  const parseInput = (input: string) => {
    return input.toLowerCase().replace(/\W/g, '-');
  };

  const handleChange = (e: ChangeEvent) => {
    if (error) setError('');
    const target = e.target as HTMLInputElement;
    setChannelName(parseInput(target.value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const workplaceId = params['workplaceId'];
    const channelName = inputRef.current?.value;
    const startsWithCharacter = !!channelName && channelName[0] !== '-';

    if (!startsWithCharacter) {
      setError('name must start with a letter or a number');
    } else {
      if (workplaceId && channelName && !submitPending.current) {
        submitPending.current = true;
        const newChannelId = await createNewChannel(workplaceId, channelName);
        navigate(`${newChannelId}`);
        closeModal();
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      submitPending.current = false;
      setChannelName('');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClick={handleBackgroundClick}>
      <DialogContent
        sx={{ width: '400px', padding: '20px 40px' }}
        className="inner-container"
      >
        <DialogTitle pl={[0]}>Create channel</DialogTitle>
        <form onSubmit={handleSubmit}>
          <label htmlFor="channel-name-input" style={{ fontSize: '0.875rem' }}>
            Enter channel name{' '}
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
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
