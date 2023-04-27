import { FC, useEffect } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import { fetchData } from '../../store/slices/data/slice';

import './LandingPage.scss';

const LandingPage: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchData('2023_01'));
  }, [dispatch]);
  return <main className="landing-page" />;
};

export { LandingPage };
