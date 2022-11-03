import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db } from 'firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import { RootState, useAppDispatch } from 'store';
import { login, logout } from 'store/auth';
import { setUser, UserType } from 'store/user';

import { saveUserToLocalStorage } from 'utils/saveUserToLocalStorage';

import { LoadingSpinner } from 'components';
import { LandingPageForUnauthenticated } from 'pages';

export const App = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    const userAuth = localStorage.getItem('auth');

    if (userAuth) {
      const localStorageUser = JSON.parse(userAuth);
      const userId = localStorageUser.user;
      const currentTime = new Date().getTime();
      const tokenExpired = localStorageUser.expirationTime < currentTime;

      if (!isAuthenticated && !tokenExpired) {
        const getUserFromFirebase = async (id: string) => {
          const userSnap = await getDoc(doc(db, 'users', id));
          if (userSnap.exists()) {
            const user = userSnap.data() as UserType;
            dispatch(setUser(user));
          }
        };

        getUserFromFirebase(userId);
        dispatch(login());
        saveUserToLocalStorage(userId);
      }

      if (tokenExpired) {
        dispatch(logout());
        localStorage.removeItem('auth');
      }
    }
    setAuthCheckComplete(true);

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

  if (authCheckComplete) {
    if (isAuthenticated) return <Outlet />;
    if (!isAuthenticated) return <LandingPageForUnauthenticated />;
  }
  return <LoadingSpinner />;
};
