import { FormEvent, useEffect, useRef } from 'react';

import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

import { RootState, useAppDispatch } from 'store';
import { registerNewUser, Role, Status } from 'store/user';

import { validateNewUser } from 'utils/validateNewUser';
import { Background, Container, Input } from './sign-up-modal.styles';

export const SignUpModal = () => {
  const dispatch = useAppDispatch();
  const { users } = useSelector((state: RootState) => state);

  const fullnameRef = useRef<HTMLDivElement>(null);
  const usernameRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);

  let fullName: HTMLInputElement;
  let username: HTMLInputElement;
  let phone: HTMLInputElement;
  let email: HTMLInputElement;
  let password: HTMLInputElement;

  useEffect(() => {
    fullName = fullnameRef.current?.firstElementChild as HTMLInputElement;
    username = usernameRef.current?.firstElementChild as HTMLInputElement;
    phone = phoneRef.current?.firstElementChild as HTMLInputElement;
    email = emailRef.current?.firstElementChild as HTMLInputElement;
    password = passwordRef.current?.firstElementChild as HTMLInputElement;
  }, []);

  const resetForm = () => {
    fullName.value = '';
    username.value = '';
    phone.value = '';
    email.value = '';
    password.value = '';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let id = nanoid(20);
    while (users[id] !== undefined) {
      id = nanoid(20);
    }

    const newUser = {
      email: email.value,
      fullName: fullName.value,
      id,
      lastActiveDate: 'now',
      lastActiveTime: 'now',
      phone: phone.value,
      profileImage: 'somepic.jpg',
      role: Role.Member,
      status: Status.Active,
      username: username.value,
    };

    validateNewUser(newUser).then((isValid) => {
      if (isValid) dispatch(registerNewUser(newUser));
    });

    resetForm();
  };

  return (
    <>
      <Background />
      <Container>
        <div className="inner-container">
          <h1>Sign Up</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="fullname">Full name</label>
              <Input ref={fullnameRef} id="fullname" />
            </div>

            <div className="input-box">
              <label htmlFor="username">Username</label>
              <Input ref={usernameRef} id="username" autoComplete="username" />
            </div>

            <div className="input-box">
              <label htmlFor="phone">Phone number</label>
              <Input ref={phoneRef} id="phone" />
            </div>

            <div className="input-box">
              <label htmlFor="email">Email address</label>
              <Input ref={emailRef} id="email" type="email" />
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
