import { FC } from 'react';
import { ApolloProvider } from '@apollo/client';

import { client } from '@/apollo';

const App: FC = () => <ApolloProvider client={client}>hello react</ApolloProvider>;

export default App;
