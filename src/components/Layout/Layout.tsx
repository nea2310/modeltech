import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import './Layout.scss';

const Layout: FC = () => {
  return (
    <div className="layout">
      <div className="layout__main">
        <Outlet />
      </div>
    </div>
  );
};

export { Layout };
