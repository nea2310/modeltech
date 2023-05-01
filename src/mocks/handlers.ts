/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  rest.get('http://localhost:3000/entries/2023_01.json', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { date: '01.01.2023', oil: '20,4564', water: '24,54768' },
        { date: '02.01.2023', oil: '30,23', water: '36,276' },
      ])
    );
  }),

  rest.get('http://localhost:3000/entries/2023_02.json', (req, res, ctx) => {
    return res(ctx.status(404));
  }),
];
