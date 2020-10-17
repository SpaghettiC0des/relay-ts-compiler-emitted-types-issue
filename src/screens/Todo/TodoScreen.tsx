import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {graphql, QueryRenderer} from 'react-relay';
import relayEnvironment from '../../services/graphql/relayEnvironment';
import {TodoScreenQuery} from '../../services/graphql/types/TodoScreenQuery.graphql';
import TodoApp from './TodoApp';

const TodoScreen = () => {
  return (
    <QueryRenderer<TodoScreenQuery>
      environment={relayEnvironment}
      query={graphql`
        query TodoScreenQuery {
          viewer {
            ...TodoApp_viewer
          }
        }
      `}
      render={({error, props}) => {
        if (error) {
          return <Text>{error}</Text>;
        }

        if (!props?.viewer) {
          return <Text>Loading...</Text>;
        }

        return (
          <SafeAreaView style={{flex: 1}}>
            <TodoApp viewer={props.viewer} />
          </SafeAreaView>
        );
      }}
      variables={{}}
    />
  );
};

export default TodoScreen;
