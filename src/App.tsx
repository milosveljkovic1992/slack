import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';

import { RootState, useAppDispatch } from 'store';
import { login, logout } from 'store/auth';
import { setUser } from 'store/user';
import { saveUserToLocalStorage } from 'utils/saveUserToLocalStorage';

export const App = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const userAuth = localStorage.getItem('auth');

    if (userAuth) {
      const localStorageUser = JSON.parse(userAuth);
      const currentTime = new Date().getTime();
      const tokenExpired = localStorageUser.expirationTime < currentTime;

      if (!isAuthenticated && !tokenExpired) {
        dispatch(setUser(user));
        dispatch(login());
        saveUserToLocalStorage(localStorageUser.user);
      }
      if (tokenExpired) {
        dispatch(logout());
        localStorage.removeItem('auth');
      }
    }

    return () => {
      const userAuth = localStorage.getItem('auth');

      if (userAuth) {
        const localStorageUser = JSON.parse(userAuth);

        const threeDaysInMiliseconds = 259200000;
        const expirationTime = new Date().getTime() + threeDaysInMiliseconds;
        localStorage.setItem(
          'auth',
          JSON.stringify({ user: localStorageUser.user, expirationTime }),
        );
      }
    };
  }, []);

  return <Outlet />;
};
