import { useState } from 'react';

import { Button, Grid } from '@mui/material';
import { FaQuestion } from 'react-icons/fa';

import { P } from 'global/Theme';
import { NewWorkplaceModal } from './new-workplace-modal';

export const CreateNewWorkplace = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      alignItems="center"
      border="1px solid #ccc"
      borderRadius="5px"
      px={2}
      py={1.5}
    >
      <Grid item xs={1}>
        <FaQuestion size={30} />
      </Grid>
      <Grid item xs={6}>
        <P fontSize="15px">Want to use Slack with a different team?</P>
      </Grid>
      <Grid item>
        <Button
          size="small"
          variant="outlined"
          sx={{ fontSize: '15px', textTransform: 'none', fontWeight: 700 }}
          onClick={handleClickOpen}
        >
          Create Another Workplace
        </Button>
        <NewWorkplaceModal open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};
