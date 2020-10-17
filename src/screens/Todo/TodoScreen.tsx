import React, {FC, Suspense, useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {graphql} from 'react-relay';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay/hooks';
import {TodoScreenQuery} from '../../services/graphql/types/TodoScreenQuery.graphql';
import TodoApp from './TodoApp';

const query = graphql`
  query TodoScreenQuery {
    viewer {
      ...TodoApp_viewer
    }
  }
`;

const TodoScreen: FC<{
  queryRef: PreloadedQuery<TodoScreenQuery>;
}> = ({queryRef}) => {
  const data = usePreloadedQuery(query, queryRef);

  return <TodoApp viewer={data.viewer} />;
};

const TodoScreenRoot = () => {
  const [queryRef, loadQuery] = useQueryLoader<TodoScreenQuery>(query);

  useEffect(() => {
    if (!queryRef) {
      loadQuery({});
    }
  }, [queryRef, loadQuery]);

  if (!queryRef) {
    return null;
  }

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SafeAreaView style={{flex: 1}}>
        <TodoScreen queryRef={queryRef} />
      </SafeAreaView>
    </Suspense>
  );
};

export default TodoScreenRoot;
