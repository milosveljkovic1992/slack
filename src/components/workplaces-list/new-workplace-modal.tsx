import { FormEvent, useRef } from 'react';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import { submitNewWorkplace } from 'store/workplace';
import { validateNewWorkplace } from 'utils/validateNewWorkplace';

interface NewWorkplaceModalProps {
  open: boolean;
  handleClose: () => void;
}

export const NewWorkplaceModal = ({
  open,
  handleClose,
}: NewWorkplaceModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const workplaceTitleRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const inputElement = workplaceTitleRef.current?.querySelector(
      '#new-workplace-title',
    ) as HTMLInputElement;

    const newWorkplace = {
      id: '',
      name: '',
      users: [user.id],
    };

    validateNewWorkplace(inputElement.value)
      .then((res) => {
        if (res) {
          newWorkplace.id = res.newWorkplaceId;
          newWorkplace.name = res.newWorkplaceName;
          dispatch(submitNewWorkplace(newWorkplace));
          navigate(`/${newWorkplace.id}`);
          handleClose();
        }
      })
      .catch((error) => {
        console.error(error);
      });

    inputElement.value = '';
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ paddingTop: '24px' }}>
        Create new workplace
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new workplace, please enter the workplace title you wish.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="new-workplace-title"
            label="Workplace title"
            type="text"
            fullWidth
            variant="standard"
            ref={workplaceTitleRef}
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ padding: ' 8px 24px' }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="outlined">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
