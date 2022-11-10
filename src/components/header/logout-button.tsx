import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import { styled } from '@mui/material';

import { useAppDispatch } from 'store';
import { logout } from 'store/auth';

const LogoutIcon = styled(IoLogOutOutline)(() => ({
  fontSize: '25px',
  padding: '5px',
  transition: '0.1s',

  '&:hover, &:focus': {
    opacity: 0.5,
  },
}));

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    dispatch(logout());
    navigate('/');
  };

  return (
    <LogoutIcon
      fontSize="25px"
      style={{ padding: '3px', cursor: 'pointer' }}
      onClick={handleLogout}
    />
  );
};
