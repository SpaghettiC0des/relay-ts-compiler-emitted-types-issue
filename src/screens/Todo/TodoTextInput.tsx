import React, {FC, useState} from 'react';
import {Input, InputProps} from 'react-native-elements';

type Props = InputProps & {
  commitOnBlur?: boolean;
  onDelete?: () => void;
  onCancel?: () => void;
  onSave: (text: string) => void;
};

const TodoTextInput: FC<Props> = ({
  defaultValue,
  commitOnBlur = false,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [text, setText] = useState(defaultValue ?? '');

  const commitChanges = () => {
    const newText = text.trim();

    if (onDelete && newText === '') {
      onDelete();
    } else if (onCancel && newText === defaultValue) {
      onCancel();
    } else if (newText !== '') {
      onSave(newText);
      setText('');
    }
  };

  const handleBlur = () => {
    if (commitOnBlur) {
      commitChanges();
    }
  };

  return (
    <Input
      autoFocus
      onBlur={handleBlur}
      value={text}
      onChangeText={setText}
      onSubmitEditing={commitChanges}
      onTouchCancel={onCancel}
    />
  );
};

export default TodoTextInput;
