import React, {FC, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {createFragmentContainer, graphql} from 'react-relay';
import {TodoList_viewer} from '../../services/graphql/types/TodoList_viewer.graphql';
import Todo from './Todo';

type Props = {
  viewer: TodoList_viewer;
};

const TodoList: FC<Props> = ({viewer}) => {
  const {todos} = viewer;

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={todos?.edges}
        keyExtractor={() => String(`${Math.random()}-${Math.random()}`)}
        renderItem={({item}) => {
          const node = item?.node;

          if (!node) {
            throw new Error('Empty todo item!');
          }

          return <Todo todo={node} viewer={viewer} />;
        }}
      />
    </View>
  );
};

export default createFragmentContainer(TodoList, {
  viewer: graphql`
    fragment TodoList_viewer on User {
      todos(
        first: 2147483647 # max GraphQLInt
      ) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            complete
            ...Todo_todo
          }
        }
      }
      id
      totalCount
      completedCount
      ...Todo_viewer
    }
  `,
});
