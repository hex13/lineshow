import fs from 'node:fs';
import assert from 'node:assert';
import { analyze, Scope } from './analyze.js';

const source = fs.readFileSync('./mocks/scopes.js', 'utf8');

const scope = analyze(source);
const expectedScope = {
    bindings: [
        {kind: 'function', name: 'exportedFoo', params: []},
        {
            kind: 'class', 
            methods: [{name: 'doThat', params: []}], 
            name: 'PublicClass'
        },
    ],
    innerScopes: [
        {
            innerScopes: [
                {
                    innerScopes: [],
                    bindings: [
                        {
                            kind: 'const',
                            name: 'a',
                        }
                    ]
                },
                new Scope([{kind: 'const', name: 'o'}]),
            ],
            bindings: [
                {kind: 'function', name: 'foo', params: []},
                {
                    kind: 'class', 
                    methods: [{name: 'doIt', params: []}], 
                    name: 'PrivateClass'
                },
            ]
        },
        new Scope([{kind: 'const', name: 'b'}]),
        new Scope([]),
    ]
};
assert.deepStrictEqual(scope, expectedScope);

// assert.deepStrictEqual(scope, {
//     bindings: [
//         {
//             kind: 'class',
//             name: 'Counter',
//             methods: [
//                 {name: 'constructor', params: []},
//                 {name: 'inc', params: [{name: 'amount'}]},
//                 {name: 'dec', params: [{name: 'amount'}]}
//             ]
//         },
//         {
//             kind: 'const',
//             name: 'someObject',
//         },
//         {
//             kind: 'const',
//             name: 'someNumber',
//         },
//     ],
//     innerScopes: [{
//         innerScopes: [{
//             innerScopes: [],
//             bindings: [{kind: 'const', name: 'year'}],
//         }],
//         bindings: [
//             {
//                 kind: 'class',
//                 name: 'Nevermind',
//                 methods: [
//                     {name: 'blah', params: [{name: 'foo'}, {name: 'bar'}]}
//                 ]
//             },
//             {kind: 'function', name: 'someFunction', params: [{name: 'someParam'}, {name: 'someParam2'}]},
//             {
//                 kind: 'const',
//                 name: 'someInternalObject',
//             },
//         ]
//     }],

// });

