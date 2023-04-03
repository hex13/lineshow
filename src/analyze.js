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



export function analyze(source) {
    const ast = parse(source);

    const classes = [];
    const functions = [];
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
                classes.at(-1).methods.push({
                    name: path.node.key.name,
                    params: path.node.params.map(({name}) => ({name})),
                });
            }
        },
        FunctionDeclaration: {
            exit(path) {
                functions.push({
                    name: path.node.id.name,
                    params: path.node.params.map(({name}) => ({name})),
                })
            }
        }
    });
    return { classes, functions };

}
