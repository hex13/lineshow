import fs from 'node:fs';
import assert from 'node:assert';

import { parse as babelParse } from '@babel/parser';
import Traverse from '@babel/traverse';
const traverse = Traverse.default;

function parse(source) {
    return babelParse(source, {
        sourceType: 'module',
        plugins: [
            'typescript',
        ]
    });
}

const source = fs.readFileSync(process.argv[2], 'utf8');

const ast = parse(source);


const classes = [];
traverse(ast, {
    ExportNamedDeclaration: {
        enter(path) {
            const { node } = path;
            
        },
        exit() {

        }
    },
    ClassDeclaration: {
        enter(path) {
            classes.push({name: path.node.id.name, methods: []})
        },
        exit(path) {
            
        }
    },
    ClassMethod: {
        enter(path) {},
        exit(path) {
            classes.at(-1).methods.push({name: path.node.key.name});
        }
    }

});

assert.deepStrictEqual(classes, [
    {
        name: 'Counter', 
        methods: [{name: 'constructor'}, {name: 'inc'}, {name: 'dec'}]
    },
    {name: 'Nevermind', methods: [{name: 'blah'}]},
]);