import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {QueryRenderer, graphql} from 'react-relay';
import TodoList from './TodoList';
import {TodoScreenQuery} from '../../services/graphql/types/TodoScreenQuery.graphql';
import relayEnvironment from '../../services/graphql/relayEnvironment';

const TodoScreen = () => {
  return (
    <QueryRenderer<TodoScreenQuery>
      environment={relayEnvironment}
      query={graphql`
        query TodoScreenQuery($userId: String) {
          user(id: $userId) {
            ...TodoList_user
          }
        }
      `}
      render={({error, props}) => {
        if (error) {
          return <Text>{error}</Text>;
        }

        if (!props) {
          return <Text>Loading...</Text>;
        }

        return (
          <SafeAreaView>
            <TodoList user={props.user} />
          </SafeAreaView>
        );
      }}
      variables={{
        userId: 'me',
      }}
    />
  );
};

export default TodoScreen;
