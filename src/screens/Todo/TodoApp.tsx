import React, {FC} from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import AddTodoMutation from '../../services/graphql/mutations/AddTodoMutation';
import {TodoApp_viewer} from '../../services/graphql/types/TodoApp_viewer.graphql';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import TodoTextInput from './TodoTextInput';
import TodoList from './TodoList';
import TodoListFooter from './TodoListFooter';

type Props = {
  relay: RelayProp;
  viewer: TodoApp_viewer;
};

const TodoApp: FC<Props> = ({relay, viewer}) => {
  const [append, setAppend] = React.useState(false);

  const handleOnSetAppend = () => setAppend((prev) => !prev);

  const handleTextInputSave = React.useCallback(
    (text: string) => {
      AddTodoMutation.commit(relay.environment, text, viewer, append);
    },
    [relay.environment, viewer, append],
  );

  const hasTodos = React.useMemo(() => (viewer.totalCount || 0) > 0, [
    viewer.totalCount,
  ]);

  return (
    <View style={{flex: 1}}>
      <Text h1>Todos</Text>
      <TodoTextInput
        autoFocus
        onSave={handleTextInputSave}
        placeholder="What needs to be done?"
      />
      <TodoList viewer={viewer} />
      {hasTodos && (
        <TodoListFooter
          viewer={viewer}
          onSetAppend={handleOnSetAppend}
          append={append}
        />
      )}
    </View>
  );
};

export default createFragmentContainer(TodoApp, {
  viewer: graphql`
    fragment TodoApp_viewer on User {
      id
      totalCount
      ...TodoListFooter_viewer
      ...TodoList_viewer
    }
  `,
});
