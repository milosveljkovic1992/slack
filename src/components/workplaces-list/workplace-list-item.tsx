import { BsArrowRight } from 'react-icons/bs';
import {
  Avatar,
  Grid,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import type { WorkplaceType } from 'store/workplace';

import { P } from 'global/Theme';
import { ListItemButton } from './workplace-list-item.styles';

interface WorkplaceListItemProps {
  workplace: WorkplaceType;
}

export const WorkplaceListItem = ({ workplace }: WorkplaceListItemProps) => {
  const avatarAbbreviation = workplace.name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0].toLocaleUpperCase())
    .join('');

  return (
    <ListItemButton>
      <ListItemAvatar>
        <Avatar>{avatarAbbreviation}</Avatar>
      </ListItemAvatar>

      <ListItemText>{workplace.name}</ListItemText>

      <Grid
        container
        xs={2}
        justifyContent="flex-end"
        className="workplace-icon"
      >
        <Grid item xs={6} className="icon-text">
          <P>Open</P>
        </Grid>

        <Grid item xs={6} display="flex" alignItems="center">
          <ListItemIcon className="icon-arrow">
            <BsArrowRight />
          </ListItemIcon>
        </Grid>
      </Grid>
    </ListItemButton>
  );
};
