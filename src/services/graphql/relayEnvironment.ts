import {
  Environment,
  RecordSource,
  Store,
} from 'relay-runtime';
import {
  RelayNetworkLayer,
  urlMiddleware,
  loggerMiddleware,
  errorMiddleware,
} from 'react-relay-network-modern';

const API_URL = 'http://localhost:3000/graphql';

const network = new RelayNetworkLayer([
  urlMiddleware({
    url: API_URL,
  }),
  __DEV__ ? loggerMiddleware() : null,
  __DEV__ ? errorMiddleware() : null,
]);

const relayEnvironment = new Environment({
  network,
  store: new Store(new RecordSource()),
});

export default relayEnvironment;
