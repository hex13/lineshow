import fs from 'node:fs';
import assert from 'node:assert';
import { analyze } from './analyze.js';

const source = fs.readFileSync('./mocks/Counter.ts', 'utf8');

const scope = analyze(source);

assert.deepStrictEqual(scope, {
    bindings: [
        {
            kind: 'class',
            name: 'Counter',
            methods: [
                {name: 'constructor', params: []},
                {name: 'inc', params: [{name: 'amount'}]},
                {name: 'dec', params: [{name: 'amount'}]}
            ]
        },
    ],
    innerScopes: [{
        innerScopes: [],
        bindings: [
            {
                kind: 'class',
                name: 'Nevermind',
                methods: [
                    {name: 'blah', params: [{name: 'foo'}, {name: 'bar'}]}
                ]
            },
            {kind: 'function', name: 'someFunction', params: [{name: 'someParam'}, {name: 'someParam2'}]}
        ]
    }],

});