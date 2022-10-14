import { ChangeEvent, FormEvent, useState } from 'react';

import { nanoid } from 'nanoid';
import { TextField } from '@mui/material';

import { RootState, useAppDispatch } from 'store';
import { registerNewUser, Role, Status } from 'store/user';
import { useSelector } from 'react-redux';
import { validateNewUser } from 'utils/validateNewUser';

export const NewUser = () => {
  const dispatch = useAppDispatch();
  const { users } = useSelector((state: RootState) => state);
  const [username, setUsername] = useState('');

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let id = nanoid(20);
    while (users[id] !== undefined) {
      id = nanoid(20);
    }

    const newUser = {
      email: 'email3@gmail.com',
      id,
      lastActiveDate: new Date().toLocaleDateString(),
      lastActiveTime: new Date().toLocaleTimeString(),
      phone: '06012322333',
      profileImage: 'somepic.jpg',
      role: Role.Member,
      status: Status.Active,
      username,
    };

    validateNewUser(newUser).then((isValid) => {
      if (isValid) dispatch(registerNewUser(newUser));
    });

    setUsername('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="username-input"
        label="Username"
        variant="outlined"
        style={{ marginTop: '4px' }}
        fullWidth={true}
        value={username}
        onChange={handleChange}
        autoComplete="off"
      />
    </form>
  );
};
