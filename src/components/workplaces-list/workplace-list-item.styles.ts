import { ListItemButton as MUIListItemButton, styled } from '@mui/material';

export const ListItemButton = styled(MUIListItemButton)(({ theme }) => ({
  padding: '12px 16px',

  '& .workplace-icon': {
    marginRight: 0,
    transition: theme.transitions.create(['margin-right'], {
      duration: theme.transitions.duration.standard,
    }),
  },

  '& .icon-text': {
    opacity: 0,
    visibility: 'hidden',
    transition: theme.transitions.create(['opacity', 'visibility'], {
      duration: theme.transitions.duration.standard,
    }),
  },

  '&:focus, &:hover': {
    '.workplace-icon': {
      marginRight: '-5px',
    },

    '.icon-text': {
      opacity: 1,
      visibility: 'visible',
      color: '#1264a3',
    },

    '.icon-arrow': {
      color: '#1264a3',
    },
  },
}));
