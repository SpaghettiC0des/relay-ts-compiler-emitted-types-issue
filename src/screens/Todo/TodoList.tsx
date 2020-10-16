import React, {FC} from 'react';
import {FlatList} from 'react-native';
import {createFragmentContainer, graphql} from 'react-relay';
import Todo from './Todo';
import {TodoList_user} from '../../services/graphql/types/TodoList_user.graphql';

type Props = {
  user: TodoList_user;
};

const TodoList: FC<Props> = ({user: {todos}}) => {
  return (
    <FlatList
      data={todos?.edges}
      keyExtractor={() => String(`${Math.random()}-${Math.random()}`)}
      renderItem={({item}) => <Todo todo={item?.node} user={user} />}
    />
  );
};

export default createFragmentContainer<Props>(TodoList, {
  user: graphql`
    fragment TodoList_user on User {
      todos(
        first: 2147483647 # max GraphQLInt
      ) @connection(key: "TodoList_todos") {
        edges {
          node {
            ...Todo_todo
          }
        }
      }
      id
      userId
      totalCount
      completedCount
      ...Todo_user
    }
  `,
});
