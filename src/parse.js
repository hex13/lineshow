import { parse as babelParse } from '@babel/parser';

export function parse(source) {
    return babelParse(source, {
        sourceType: 'module',
        plugins: [
            'typescript',
            'jsx',
        ]
    });
}
