module.exports = {
    extends: ['airbnb-typescript'],
    parserOptions: {
        project: './tsconfig.json',
        createDefaultProgram: true,
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'], // Your TypeScript files extension
            parserOptions: {
                project: ['./tsconfig.json'], // Specify it only for TypeScript files
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    rules: {
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4],
        'react/prop-types': 0,
        'react/jsx-indent': [1, 4],
        'react/jsx-indent-props': [1, 4],
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': 'off',
        'space-infix-ops': 'off',
        '@typescript-eslint/space-infix-ops': 'off',
    },
    env: {
        browser: true,
    },
};
