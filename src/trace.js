import { parse } from './parse.js';
import Traverse from '@babel/traverse';
import Generate from '@babel/generator';
import t from '@babel/types';
const traverse = Traverse.default;
const generate = Generate.default;

function spy(node) {
    const start = node.loc.start.index;
    const end = node.loc.end.index;

    return t.awaitExpression(t.callExpression(
        t.identifier('$$run'),
        [t.arrowFunctionExpression([], node, true), t.numericLiteral(start), t.numericLiteral(end)],
    ));
}

function replaceWithSpy(path) {
    path.replaceWith(spy(path.node));
    path.skip();
}

export function trace(source) {
    const ast = parse(source);
    traverse(ast, {
        CallExpression: {
            exit(path) {
                replaceWithSpy(path);
            }
        },
        UpdateExpression: {
            exit(path) {
                replaceWithSpy(path);
            }
        }

    });
    const out = generate(ast, {}, );
    const runtimeCode = `
        const $$source = ${JSON.stringify(source)};
        let $$log = s => console.log(s);
        if (typeof document != 'undefined') {
            const out = document.getElementById('out');
            $$log = (s) => { out.innerText += s };
        }
        function $$run(f, start, end) {
            return new Promise(async resolve => {
                const result = await f();
                setTimeout(async () => {
                    $$log('...' + $$source.slice(start, end) + " => " + result + "\\n");
                    resolve(result);
                }, 500);
            });
        }
    `;
    console.log(runtimeCode);
    console.log(out.code);
}


