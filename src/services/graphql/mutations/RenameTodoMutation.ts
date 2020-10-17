/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { graphql } from 'react-relay';
import { useMutation } from 'react-relay/hooks';
import { UseMutationConfig } from 'react-relay/lib/relay-experimental/useMutation';
import { Disposable } from 'relay-runtime';
import {
  RenameTodoMutation,
  RenameTodoMutationRawResponse,
  RenameTodoMutationVariables
} from '../types/RenameTodoMutation.graphql';

const mutation = graphql`
  mutation RenameTodoMutation($input: RenameTodoInput!) @raw_response_type {
    renameTodo(input: $input) {
      todo {
        id
        text
      }
    }
  }
`;

function getOptimisticResponse(
  variables: RenameTodoMutationVariables,
): RenameTodoMutationRawResponse {
  const {id, text} = variables.input;
  return {
    renameTodo: {
      todo: {
        id,
        text,
      },
    },
  };
}

export const useRenameTodoMutation = (): [
  (
    config: Omit<UseMutationConfig<RenameTodoMutation>, 'optimisticResponse'>,
  ) => Disposable,
  boolean,
] => {
  const [commit, isInFlight] = useMutation<RenameTodoMutation>(mutation);

  const commitFn = (
    config: Omit<UseMutationConfig<RenameTodoMutation>, 'optimisticResponse'>,
  ) =>
    commit({
      ...config,
      optimisticResponse: getOptimisticResponse(config.variables),
    });

  return [commitFn, isInFlight];
};
