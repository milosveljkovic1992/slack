import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebase-config';

import type { UserType } from 'store/user';

export const validateNewUser = async (newUser: UserType) => {
  const usersRef = collection(db, 'users');
  const usersSnapshot = await getDocs(usersRef);

  try {
    usersSnapshot.forEach((res) => {
      const user = res.data() as UserType;
      const { email, phone } = newUser;
      const username = newUser.username.trim().toLowerCase();

      const isUsernameShort = username.length < 3;
      const containsWhitespace = /\s/.test(username);

      const isUniqueUsername = user.username.toLowerCase() !== username;
      const isUniqueEmail = user.email !== email;
      const isUniquePhone = user.phone !== phone;

      if (isUsernameShort) throw 'username contains less than 3 characters';
      if (containsWhitespace) throw 'username cannot contain spaces';
      if (!isUniqueUsername) throw 'username already registered';
      if (!isUniqueEmail) throw 'email already registered';
      if (!isUniquePhone) throw 'phone already registered';
    });
    console.info('Success!');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
