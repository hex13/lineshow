import React from 'react';

function FunctionEntity({ entity }) {
    return <>
        <span className="keyword">fn</span> {entity.name}({entity.params.map((param, i, arr) => <span key={i} className="param">{param.name}{i < arr.length - 1? ',' : null}</span>)})
    </>
}


function ClassEntity({ entity }) {
    return <>
        <span className="keyword">class</span> {entity.name}:
            <ul>
                {entity.methods.map((method, i) => <li key={i}><Entity kind='function' entity={method} /></li>)}
            </ul>
    </>
}

export function Entity({ kind, entity }) {
    switch (kind || entity.kind) {
        case 'function':
            return <FunctionEntity entity={entity} />;
        case 'class':
            return <ClassEntity entity={entity} />;
        default:
            return <span>{entity.name} : {entity.kind}</span>
    }
}
