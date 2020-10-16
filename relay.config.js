module.exports = {
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  language: 'typescript',
  src: './src',
  schema: './src/services/graphql/schema.graphql',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  artifactDirectory: './src/services/graphql/types',
  extensions: ['js', 'jsx', 'ts', 'tsx'],
};
