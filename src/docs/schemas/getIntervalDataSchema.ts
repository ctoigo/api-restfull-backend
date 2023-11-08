export const getIntervalDataSchema = {
  type: 'object',
  properties: {
    max: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          producer: { type: 'string' },
          interval: { type: 'number' },
          previousWin: { type: ['number', 'null'] },
          followingWin: { type: 'number' },
        },
      },
    },
    min: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          producer: { type: 'string' },
          interval: { type: 'number' },
          previousWin: { type: ['number', 'null'] },
          followingWin: { type: 'number' },
        },
      },
    },
  },
};
