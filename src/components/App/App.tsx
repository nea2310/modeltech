import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import { AppRoutes } from '../../routes';

import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" newestOnTop />;
    </>
  );
};

export { App };
