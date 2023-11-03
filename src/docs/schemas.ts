import {
  errorSchema,
  successSchema,
  withLongestGapSchema,
  withShortestGapSchema,
} from './schemas/';

export default {
  error: errorSchema,
  success: successSchema,
  withLongestGap: withLongestGapSchema,
  withShortestGap: withShortestGapSchema,
};
