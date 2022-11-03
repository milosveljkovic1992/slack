import { db } from 'firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { WorkplaceType } from 'store/workplace';

export const fetchWorkplace = async (workplaceId: string) => {
  const workplaceRef = doc(db, 'workplaces', workplaceId);
  const workplaceSnap = await getDoc(workplaceRef);
  const workplaceData = workplaceSnap.data() as WorkplaceType;
  return workplaceData;
};
