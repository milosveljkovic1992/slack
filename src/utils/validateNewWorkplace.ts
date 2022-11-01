import { db } from 'firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { nanoid } from 'nanoid';

interface Workplaces {
  [key: string]: string;
}

export const validateNewWorkplace = async (newWorkplaceName: string) => {
  const workplacesRef = collection(db, 'workplaces');
  const workplacesSnapshot = await getDocs(workplacesRef);

  let id = nanoid(20);

  const workplaces: Workplaces = {};

  try {
    workplacesSnapshot.forEach((res) => {
      const workplace = res.data();
      const { id, name } = workplace;
      workplaces[id] = id;

      const isNameTaken = newWorkplaceName.toLowerCase() === name.toLowerCase();
      if (isNameTaken) throw new Error('Please choose another workplace name');
    });

    while (workplaces[id] !== undefined) {
      id = nanoid(20);
    }
    return { newWorkplaceName, newWorkplaceId: id };
  } catch (error) {
    if (error) throw error;
  }
};
