import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ListItem, Input, CheckBox} from 'react-native-elements';
import {createFragmentContainer, graphql} from 'react-relay';
import { Todo_todo } from '../../services/graphql/types/Todo_todo.graphql';
import { Todo_user } from '../../services/graphql/types/Todo_user.graphql';

type Props = {
  todo: Todo_todo;
  user: Todo_user;
};

const Todo: FC<Props> = ({todo: {complete, text}}) => {
  return (
    <ListItem>
      <ListItem.CheckBox checked={complete} />
      <ListItem.Content>
        <ListItem.Title>{text}</ListItem.Title>
      </ListItem.Content>
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
  user: graphql`
    fragment Todo_user on User {
      id
      userId
      totalCount
      completedCount
    }
  `,
});
