import { db } from 'firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const checkCredentials = async (email: string, username: string) => {
  let isAuthenticated = false;
  let data = {};

  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return false;

  querySnapshot.forEach((doc) => {
    if (username === doc.data().username) {
      isAuthenticated = true;
      data = doc.data();
    }
  });

  return isAuthenticated && data;
};
