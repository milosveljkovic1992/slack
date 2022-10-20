import { Button } from '@mui/material';
import {
  Background,
  Container,
  Input,
} from 'components/sign-up-modal/sign-up-modal.styles';
import { FormEvent, useEffect, useRef } from 'react';

export const LoginModal = () => {
  const usernameRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);

  let username: HTMLInputElement;
  let password: HTMLInputElement;

  useEffect(() => {
    username = usernameRef.current?.firstElementChild as HTMLInputElement;
    password = passwordRef.current?.firstElementChild as HTMLInputElement;
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    return;
  };

  return (
    <>
      <Background />
      <Container>
        <div className="inner-container">
          <h1>Sign Up</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="username">Username</label>
              <Input ref={usernameRef} id="username" autoComplete="username" />
            </div>

            <div className="input-box">
              <label htmlFor="password">Password</label>
              <Input
                ref={passwordRef}
                id="password"
                type="password"
                autoComplete="new-password"
              />
            </div>

            <Button type="submit" variant="contained">
              Sign up
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
