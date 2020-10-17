import React from 'react';
import TodoScreenRoot from './src/screens/Todo/TodoScreen';
import {RelayEnvironmentProvider} from 'react-relay/hooks';
import relayEnvironment from './src/services/graphql/relayEnvironment';

export default () => (
  <RelayEnvironmentProvider environment={relayEnvironment}>
    <TodoScreenRoot />
  </RelayEnvironmentProvider>
);
