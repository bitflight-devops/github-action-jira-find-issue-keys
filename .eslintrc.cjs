const pp = 'plugin:prettier/recommended';
module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: false,
  },

  overrides: [
    {
      plugins: ['actions'],
      files: ['.github/workflows/*.{yml,yaml}'],
      processor: 'actions/actions',
    },
    {
      files: ['*.yml', '*.yaml'],
      parser: 'yaml-eslint-parser',
      env: { es2022: true, node: true },
      parserOptions: {
        jsonSyntax: 'JSONC',
      },
      extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:json-schema-validator/recommended',
        pp,
      ],
    },
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
      env: { es2022: true, node: true },
      parserOptions: {
        jsonSyntax: 'JSONC',
      },
      extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:json-schema-validator/recommended',
        pp,
      ],
    },
    {
      files: ['*.js', '*.cjs', '*.jsx'],
      plugins: [
        'import',
        'jest',
        'jest-async',
        '@typescript-eslint',
        'optimize-regex',
        'editorconfig',
        'promise',
        'neverthrow',
        'node',
      ],
      extends: ['airbnb-base', 'eslint:recommended', 'plugin:editorconfig/all', pp],
      rules: {
        'no-plusplus': 'off',
        'unicorn/prefer-module': 'off',
        'no-use-before-define': 'off',
        'no-console': 'off',
        'sonarjs/cognitive-complexity': 'off',
        'camelcase': 'off',
        'import/extensions': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
      parser: '@babel/eslint-parser',
      env: { es2022: true, node: true },
      parserOptions: {
        requireConfigFile: false,
        sourceType: 'script',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    {
      files: ['*.html'],
      plugins: ['editorconfig'],
      extends: ['plugin:editorconfig/all', pp],
      rules: {
        'no-plusplus': 'off',
      },
      parserOptions: {
        ecmaVersion: 2017,
      },

      env: {
        es6: true,
      },
    },
    {
      files: ['src/**/*.ts', '__tests__/**/*.ts'],
      plugins: [
        'import',
        'jest',
        'jest-async',
        '@typescript-eslint',
        'optimize-regex',
        'editorconfig',
        'promise',
        'neverthrow',
        'node',
      ],
      extends: [
        'plugin:neverthrow/recommended',
        'plugin:promise/recommended',
        'plugin:no-use-extend-native/recommended',
        'plugin:jest/recommended',
        'plugin:editorconfig/all',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:sonarjs/recommended',
        'plugin:unicorn/recommended',
        'plugin:optimize-regex/recommended',
        pp,
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.eslint.json', './__tests__/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        'import/order': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        'import/no-cycle': 'off',
        'import/namespace': 'off',
        'import/default': 'off',
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': [
          'warn',
          {
            allowIndexSignaturePropertyAccess: true,
          },
        ],
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        'unicorn/consistent-destructuring': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        'node/no-missing-import': 'off',
        'node/no-empty-function': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        'node/no-missing-require': 'off',
        'node/shebang': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'node/no-unpublished-import': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'jest-async/expect-return': 'error',
        'operator-linebreak': ['error', 'before'],
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
          },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'no-public',
          },
        ],
        'import/no-unresolved': 'error',
        '@typescript-eslint/func-call-spacing': ['error', 'never'],
        '@typescript-eslint/lines-between-class-members': ['error'],
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-function-type': 'warn',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unbound-method': 'error',
        'no-return-await': 'off',
        '@typescript-eslint/return-await': 'warn',
        'quote-props': 'off',
        'camelcase': 'off',
        'consistent-return': 'off',
        'eslint-comments/no-use': 'off',
        'github/no-then': 'off',
        'import/extensions': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-namespace': 'off',
        'import/prefer-default-export': 'off',
        'import/prefer-default-import': 'off',
        'lines-between-class-members': 'off',
        'no-console': 'off',
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'no-restricted-syntax': 'off',
        'one-var': 'off',
        'semi': 'off',
        'sort-imports': 'off',
        'sonarjs/cognitive-complexity': 'off',
        'space-before-function-paren': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/import': 'off',
        'unicorn/import-style': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/prevent-abbreviations': 'off',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'off',
        'import/no-extraneous-dependencies': 'off',

        'editorconfig/indent': 'off',

        'simple-import-sort/exports': 'off',
        'simple-import-sort/imports': 'off',
      },
      globals: {
        NodeJS: true,
      },
      env: {
        'browser': false,
        'node': true,
        'es6': true,
        'es2022': true,
        'jest/globals': true,
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
          },
        },
      },
    },
  ],
};
