import type { CodegenConfig } from '@graphql-codegen/cli';

const PROTOCOL = process.env.NEXT_PUBLIC_BASE_PROTOCOL || 'http';
const HOST = process.env.NEXT_PUBLIC_BASE_URL_HOST || 'localhost:1337';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${PROTOCOL}://${HOST}/graphql`,
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    'src/lib/gql/': {
      preset: 'client',
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
