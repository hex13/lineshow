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

export function Scope(bindings = []) {
    return {bindings, innerScopes: []};
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
    function enterScope() {
        const scope = new Scope();
        scopes.at(-1).innerScopes.push(scope);
        scopes.push(scope);
    }
    function exitScope() {
        scopes.pop();
    }

    traverse(ast, {
        ExportNamedDeclaration: {
            enter(path) {
                const { node } = path;
                scopes.push(publicTopScope);
            },
            exit(path) {
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
            enter(path) {
                declareMethod({
                    name: path.node.key.name,
                    params: path.node.params.map(({name}) => ({name})),
                });
                enterScope();
            },
            exit(path) {
                exitScope();
            }
        },
        FunctionDeclaration: {
            enter(path) {
                enterScope();
            },
            exit(path) {
                exitScope();
                declareBinding({
                    kind: 'function',
                    name: path.node.id.name,
                    params: path.node.params.map(({name}) => ({name})),
                });
            }
        },
        VariableDeclaration: {
            exit(path) {
                declareBinding({
                    kind: path.node.kind,
                    name: path.node.declarations[0].id.name,
                });
            }
        }
    });
    return publicTopScope;

}
