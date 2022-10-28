import { BsArrowRight } from 'react-icons/bs';
import {
  Avatar,
  Grid,
  Link,
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
    <Link href={workplace.id}>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>{avatarAbbreviation}</Avatar>
        </ListItemAvatar>

        <ListItemText>{workplace.name}</ListItemText>

        <Grid
          width="100px"
          display="flex"
          gap={1}
          justifyContent="space-around"
          className="workplace-icon"
        >
          <Grid item xs={6} className="icon-text">
            <P>Open</P>
          </Grid>

          <Grid
            item
            xs={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ListItemIcon className="icon-arrow">
              <BsArrowRight />
            </ListItemIcon>
          </Grid>
        </Grid>
      </ListItemButton>
    </Link>
  );
};
