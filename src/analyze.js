import { parse as babelParse } from '@babel/parser';
import Traverse from '@babel/traverse';
const traverse = Traverse.default;

function parse(source) {
    return babelParse(source, {
        sourceType: 'module',
        plugins: [
            'typescript',
            'jsx',
        ]
    });
}

function Scope() {
    return {bindings: [], innerScopes: []};
}

export function analyze(source) {
    const ast = parse(source);


    const publicTopScope = new Scope();
    const privateTopScope = new Scope();
    publicTopScope.innerScopes.push(privateTopScope);
    const scopes = [privateTopScope];

    function declareBinding(binding) {
        scopes.at(-1).bindings.push(binding);
    }
    function declareMethod(method) {
        scopes.at(-1).bindings.at(-1).methods.push(method);
    }

    traverse(ast, {
        ExportNamedDeclaration: {
            enter(path) {
                const { node } = path;
                scopes.push(publicTopScope);
            },
            exit() {
                scopes.pop();
            }
        },
        ClassDeclaration: {
            enter(path) {
                declareBinding({kind: 'class', name: path.node.id.name, methods: []});
            },
            exit(path) {

            }
        },
        ClassMethod: {
            enter(path) {},
            exit(path) {

                declareMethod({
                    name: path.node.key.name,
                    params: path.node.params.map(({name}) => ({name})),
                });
            }
        },
        FunctionDeclaration: {
            exit(path) {
                declareBinding({
                    kind: 'function',
                    name: path.node.id.name,
                    params: path.node.params.map(({name}) => ({name})),
                })
            }
        }
    });
    return publicTopScope;

}
