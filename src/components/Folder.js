import React from 'react';
import { File } from './File.js';
export function Folder({ folder }) {
    return <li>
        { folder.path }
        <ul>
            {folder.children.map(item => {
                if (item.kind == 'Folder') return <Folder key={item.path} folder={item} />;
                else return <File key={item.path} file={item} />;
            })}
        </ul>
    </li>;
}
