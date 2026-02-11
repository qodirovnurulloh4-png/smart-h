import { z } from 'zod';
import { insertSlideSchema, slides } from './schema';

export const api = {
  slides: {
    list: {
      method: 'GET' as const,
      path: '/api/slides' as const,
      responses: {
        200: z.array(z.custom<typeof slides.$inferSelect>()),
      },
    },
  },
};
