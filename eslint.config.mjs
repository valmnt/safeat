import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        ignores: ['node_modules/**', 'build/**', 'dist/**'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react: eslintPluginReact,
            'react-native': eslintPluginReactNative,
            'react-hooks': eslintPluginReactHooks,
            '@typescript-eslint': eslintPluginTypescript,
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...(eslintPluginReact.configs.recommended?.rules || {}),
            ...(eslintPluginTypescript.configs.recommended?.rules || {}),
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: true,
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                },
            ],
            'no-console': 'error',
            'prefer-const': 'error',
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'prettier/prettier': 'error',
        },
    },
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
