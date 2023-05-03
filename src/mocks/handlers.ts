import { rest } from 'msw';

import { data as data_2023_01 } from './2023_01';
import { data as data_2023_02 } from './2023_02';

export const handlers = [
  rest.get('http://localhost:3000/entries/2023_01.json', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data_2023_01));
  }),
  rest.get('http://localhost:3000/entries/2023_02.json', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data_2023_02));
  }),

  rest.get('http://localhost:3000/entries/2023_02.json', (req, res, ctx) => {
    return res(ctx.status(404));
  }),
];
