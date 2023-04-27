import { Route, Routes } from 'react-router-dom';

import { Layout } from '../components/Layout/Layout';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';

import { SCREENS } from './endpoints';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={SCREENS.LANDING} element={<LandingPage />} />
        <Route path={SCREENS.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export { AppRoutes };
