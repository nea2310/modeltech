import { FC } from 'react';

import './NotFoundPage.scss';

const NotFoundPage: FC = () => {
  return (
    <main className="not-found-page">
      <h1 className="not-found-page__header"> 404</h1>
      <span className="not-found-page__text">Page not found</span>
    </main>
  );
};

export { NotFoundPage };
