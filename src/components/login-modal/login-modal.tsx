import { FormEvent, MouseEvent, useEffect, useRef } from 'react';

import { Button } from '@mui/material';

import { useAppDispatch } from 'store';
import { login } from 'store/auth';
import { rejectRequest, resolveRequest, submitRequest } from 'store/request';
import { setUser, UserType } from 'store/user';

import { checkCredentials } from 'utils/checkCredentials';
import { saveUserToLocalStorage } from 'utils/saveUserToLocalStorage';

import {
  Background,
  Container,
  Input,
} from 'components/sign-up-modal/sign-up-modal.styles';

interface LoginModalProps {
  handleCloseModal: (e: MouseEvent) => void;
}

export const LoginModal = ({ handleCloseModal }: LoginModalProps) => {
  const dispatch = useAppDispatch();
  const animationRef = useRef<HTMLDivElement>(null);
  const usernameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  let username: HTMLInputElement;
  let email: HTMLInputElement;

  useEffect(() => {
    setTimeout(() => {
      animationRef.current?.classList.add('fade-in', 'zoom-in');
    }, 0);

    username = usernameRef.current?.firstElementChild as HTMLInputElement;
    email = emailRef.current?.firstElementChild as HTMLInputElement;
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(submitRequest());
    checkCredentials(email.value, username.value).then(
      (authResult: boolean | UserType) => {
        if (typeof authResult === 'boolean') {
          dispatch(rejectRequest('Username or email are incorrect'));
        } else {
          dispatch(setUser(authResult));
          dispatch(login());
          saveUserToLocalStorage(authResult.id);
          dispatch(resolveRequest('Logged in'));
        }
      },
    );
  };

  return (
    <>
      <Background onClick={handleCloseModal} />
      <Container ref={animationRef} onMouseDown={handleCloseModal}>
        <div className="inner-container">
          <h1>Log in</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="username">Username</label>
              <Input ref={usernameRef} id="username" autoComplete="username" />
            </div>

            <div className="input-box">
              <label htmlFor="email">Email</label>
              <Input ref={emailRef} id="email" type="email" />
            </div>

            <Button type="submit" variant="contained">
              Login
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
