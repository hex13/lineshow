import React from 'react';
import { Loc } from './Loc.js';
import { Feature } from './Feature.js';

export function File({ file }) {
    return <li>
        <a href={file.previewPath}>{file.path.split('/').pop()}</a>
        &nbsp;<Loc value={file.loc} />
        {file.features.map(feature => <Feature feature={feature} />)}
    </li>
}
