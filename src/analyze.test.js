import fs from 'node:fs';
import assert from 'node:assert';
import { analyze } from './analyze.js';

const source = fs.readFileSync('./mocks/Counter.ts', 'utf8');

const { classes } = analyze(source);
assert.deepStrictEqual(classes, [
    {
        name: 'Counter',
        methods: [
            {name: 'constructor', params: []},
            {name: 'inc', params: [{name: 'amount'}]},
            {name: 'dec', params: [{name: 'amount'}]}
        ]
    },
    {
        name: 'Nevermind',
        methods: [
            {name: 'blah', params: [{name: 'foo'}, {name: 'bar'}]}
        ]
    },
]);