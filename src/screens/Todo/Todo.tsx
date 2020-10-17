import React, {FC, useCallback, useState} from 'react';
import {Icon, ListItem} from 'react-native-elements';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import ChangeTodoStatusMutation from '../../services/graphql/mutations/ChangeTodoStatusMutation';
import RemoveTodoMutation from '../../services/graphql/mutations/RemoveTodoMutation';
import {useRenameTodoMutation} from '../../services/graphql/mutations/RenameTodoMutation';
import {Todo_todo} from '../../services/graphql/types/Todo_todo.graphql';
import {Todo_viewer} from '../../services/graphql/types/Todo_viewer.graphql';
import TodoTextInput from './TodoTextInput';

interface Props {
  relay: RelayProp;
  todo: Todo_todo;
  viewer: Todo_viewer;
}

const Todo: FC<Props> = ({relay, todo, viewer}) => {
  const [commitRenameTodo] = useRenameTodoMutation();
  const [isEditing, setIsEditing] = useState(false);

  const {complete, text} = todo;

  const handleCompleteChange = useCallback(() => {
    ChangeTodoStatusMutation.commit(
      relay?.environment,
      !complete,
      todo,
      viewer,
    );
  }, [complete, todo, viewer]);

  const handleDestroyClick = () => removeTodo();

  const handleItemPress = () => setIsEditing(true);

  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    removeTodo();
  };

  const handleTextInputSave = useCallback(
    (text: string) => {
      setIsEditing(false);

      commitRenameTodo({
        variables: {
          input: {
            id: todo.id,
            text,
          },
        },
      });
    },
    [relay, todo],
  );

  const removeTodo = useCallback(() => {
    RemoveTodoMutation.commit(relay?.environment, todo, viewer);
  }, [relay, todo, viewer]);

  const renderTextInput = () => (
    <TodoTextInput
      commitOnBlur
      defaultValue={todo.text ?? ''}
      onSave={handleTextInputSave}
      onDelete={handleTextInputDelete}
      onCancel={handleTextInputCancel}
    />
  );

  return (
    <ListItem onPress={handleItemPress}>
      <ListItem.CheckBox checked={!!complete} onPress={handleCompleteChange} />
      <ListItem.Content>
        {isEditing ? (
          renderTextInput()
        ) : (
          <ListItem.Title
            style={{
              textDecorationLine: complete ? 'line-through' : 'none',
            }}>
            {text}
          </ListItem.Title>
        )}
      </ListItem.Content>
      <Icon
        type="ionicon"
        name="ios-close"
        onPress={handleDestroyClick}
        size={35}
      />
    </ListItem>
  );
};

export default createFragmentContainer(Todo, {
  todo: graphql`
    fragment Todo_todo on Todo {
      complete
      id
      text
    }
  `,
  viewer: graphql`
    fragment Todo_viewer on User {
      id
      totalCount
      completedCount
    }
  `,
});
