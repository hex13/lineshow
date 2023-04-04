import React from 'react';
import { Loc } from './Loc.js';
import { Feature } from './Feature.js';
import { Entity } from './Entity.js';


function Scope({ scope }) {
    return <div>
        <ul>
        {scope.bindings.map((binding, i) => {
            return <li key={i}><Entity entity={binding} /></li>
        })}
        </ul>
        {scope.innerScopes? scope.innerScopes.map((scope, i) => <div key={i} style={{opacity: 0.5}}><Scope scope={scope} /></div>):null}
    </div>
}

export function File({ file }) {
    return <li>
        <a href={file.previewPath}>{file.path.split('/').pop()}</a>
        &nbsp;<Loc value={file.loc} />
        {file.features.map(feature => <Feature feature={feature} />)}
        {file.scope? <Scope scope={file.scope} /> : null}
    </li>
}
