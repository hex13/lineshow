import React from 'react';
import { Loc } from './Loc.js';
import { Feature } from './Feature.js';

export function File({ file }) {
    return <li>
        {file.path.split('/').pop()}
        &nbsp;<Loc value={file.loc} />
        {file.features.map(feature => <Feature feature={feature} />)}
    </li>
}
