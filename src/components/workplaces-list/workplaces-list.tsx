import { Fragment, useEffect, useState } from 'react';

import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';

import { db } from 'firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { RootState } from 'store';
import { WorkplaceType } from 'store/workplace';

import { WorkplaceListItem } from './workplace-list-item';
import { LoadingSpinner } from 'components/loading-spinner/loading-spinner';

export const WorkplacesList = () => {
  const { email, id } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [workplaces, setWorkplaces] = useState<WorkplaceType[]>([]);

  const getCurrentUserWorkplaces = async (id: string) => {
    const fetchedWorkplaces: WorkplaceType[] = [];

    const workplacesRef = collection(db, 'workplaces');
    const q = query(workplacesRef, where('users', 'array-contains', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      fetchedWorkplaces.push(doc.data() as WorkplaceType);
    });

    setWorkplaces(fetchedWorkplaces);
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) getCurrentUserWorkplaces(id);
  }, [id]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="workplaces-list">
      <List
        sx={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 0 15px -10px',
          width: '100%',
          maxWidth: '600px',
          padding: 0,
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemText>
            Workplaces for <b>{email}</b>
          </ListItemText>
        </ListItem>

        {workplaces.length > 0 && <Divider />}

        {workplaces.length > 0 &&
          workplaces.map((workplace, index) => {
            return (
              <Fragment key={workplace.id}>
                <WorkplaceListItem workplace={workplace} />
                {workplaces[index + 1] && <Divider />}
              </Fragment>
            );
          })}
      </List>
    </section>
  );
};
