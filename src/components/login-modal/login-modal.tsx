import { FormEvent, useEffect, useRef } from 'react';

import { Button } from '@mui/material';

import { useAppDispatch } from 'store';
import { setUser, UserType } from 'store/user';
import { checkCredentials } from 'utils/checkCredentials';

import {
  Background,
  Container,
  Input,
} from 'components/sign-up-modal/sign-up-modal.styles';

export const LoginModal = () => {
  const dispatch = useAppDispatch();
  const animationRef = useRef<HTMLDivElement>(null);
  const usernameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  let username: HTMLInputElement;
  let email: HTMLInputElement;

  useEffect(() => {
    animationRef.current?.classList.add('fade-in', 'zoom-in');

    username = usernameRef.current?.firstElementChild as HTMLInputElement;
    email = emailRef.current?.firstElementChild as HTMLInputElement;
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    checkCredentials(email.value, username.value).then(
      (authResult: boolean | UserType) => {
        if (typeof authResult !== 'boolean') dispatch(setUser(authResult));
      },
    );
  };

  return (
    <>
      <Background />
      <Container ref={animationRef}>
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
