import { FC } from 'react';

import { PeriodSelector } from '../../components/PeriodSelector/PeriodSelector';
import { useAppDispatch } from '../../hooks/redux';
import { fetchData } from '../../store/slices/data/slice';

import { options } from './constants';
import './LandingPage.scss';

const LandingPage: FC = () => {
  const dispatch = useAppDispatch();
  const handleChange = (value: string) => dispatch(fetchData(value));
  return (
    <main className="landing-page">
      <PeriodSelector options={options} onChange={handleChange} />
    </main>
  );
};

export { LandingPage };
