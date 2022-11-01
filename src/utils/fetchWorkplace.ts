import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { db } from 'firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { RootState } from 'store';
import { selectWorkplace, WorkplaceType } from 'store/workplace';

export const fetchWorkplace = async (
  dispatch: ThunkDispatch<RootState, void, Action>,
  workplaceId: string,
) => {
  const workplaceRef = doc(db, 'workplaces', workplaceId);
  const workplaceSnap = await getDoc(workplaceRef);
  const workplaceData = workplaceSnap.data() as WorkplaceType;
  dispatch(selectWorkplace(workplaceData));
};
