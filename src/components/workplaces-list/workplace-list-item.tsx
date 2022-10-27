import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import type { WorkplaceType } from 'store/workplace';

export const WorkplaceListItem = ({
  workplace,
}: {
  workplace: WorkplaceType;
}) => {
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
    </ListItemButton>
  );
};
