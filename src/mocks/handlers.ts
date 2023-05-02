import { rest } from 'msw';

import { data } from './data';

export const handlers = [
  rest.get('http://localhost:3000/entries/2023_01.json', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.get('http://localhost:3000/entries/2023_02.json', (req, res, ctx) => {
    return res(ctx.status(404));
  }),
];
