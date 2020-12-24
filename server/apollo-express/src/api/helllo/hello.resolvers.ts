import { Resolvers } from '@gql-types/api';

const resovlers: Resolvers = {
  Query: {
    hello: () => ({ message: 'hello apollo!' }),
  },
};

export default resovlers;
