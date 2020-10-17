import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {TodoListFooter_viewer} from '../../services/graphql/types/TodoListFooter_viewer.graphql';
import RemoveCompletedTodosMutation from '../../services/graphql/mutations/RemoveCompletedTodosMutation';
import {CheckBox, Button} from 'react-native-elements';

type Props = {
  relay: RelayProp;
  viewer: TodoListFooter_viewer;
  append: boolean;
  onSetAppend: () => void;
};

const TodoListFooter: FC<Props> = ({relay, viewer, append, onSetAppend}) => {
  const numCompletedTodos = viewer.completedCount ?? 0;
  const numRemainingTodos = (viewer.totalCount ?? 0) - numCompletedTodos;

  const handleRemoveCompletedTodosClick = () => {
    RemoveCompletedTodosMutation.commit(
      relay?.environment,
      viewer.completedTodos,
      viewer,
    );
  };

  return (
    <View>
      <Text style={{fontWeight: '700'}}>
        {numRemainingTodos} item
        {numRemainingTodos === 1 ? '' : 's'} left
      </Text>
      <CheckBox checked={append} onPress={onSetAppend} title="Append" />
      {numCompletedTodos > 0 ? (
        <Button
          title="Clear completed"
          onPress={handleRemoveCompletedTodosClick}
        />
      ) : null}
    </View>
  );
};

export default createFragmentContainer(TodoListFooter, {
  viewer: graphql`
    fragment TodoListFooter_viewer on User {
      id
      completedCount
      completedTodos: todos(
        status: "completed"
        first: 2147483647 # max GraphQLInt
      ) {
        edges {
          node {
            id
            complete
          }
        }
      }
      totalCount
    }
  `,
});
