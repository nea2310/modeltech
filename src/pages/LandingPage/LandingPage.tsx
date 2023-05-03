import { FC } from 'react';

import { PeriodSelector } from '../../components/PeriodSelector/PeriodSelector';
import { Table } from '../../components/Table/Table';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { entriesSelect } from '../../store/slices/data/selectors';
import {
  fetchDataFromFile,
  fetchDataFromMock,
} from '../../store/slices/data/slice';

import { options } from './constants';

const LandingPage: FC = () => {
  const entries = useAppSelector(entriesSelect);
  const dispatch = useAppDispatch();
  const handleChangeListFromMock = (value: string) =>
    dispatch(fetchDataFromMock(value));
  const handleChangeListFromFile = (value: string) => {
    dispatch(fetchDataFromFile(value));
  };

  return (
    <main className="landing-page">
      <div className="landing-page__table">
        <Table entries={entries} />
      </div>
      <div className="landing-page__select-from-mock">
        <span>Выберите период для отображения данных *</span>
        <PeriodSelector options={options} onChange={handleChangeListFromMock} />
      </div>
      <div className="landing-page__select-from-file">
        <span>Выберите период для отображения данных **</span>
        <PeriodSelector options={options} onChange={handleChangeListFromFile} />
      </div>
      <span>* - данные будут загружены с помощью mock service worker</span>
      <span>** - данные будут загружены из .xlsx файла</span>
    </main>
  );
};

export { LandingPage };
