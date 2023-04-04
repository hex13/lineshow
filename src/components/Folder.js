import React from 'react';
import { File } from './File.js';
export function Folder({ folder }) {
    return <li class="folder">
        <span class="folder-name">{ folder.path }</span>
        <ul>
            {folder.children.map(item => {
                if (item.kind == 'Folder') return <Folder key={item.path} folder={item} />;
                else return <File key={item.path} file={item} />;
            })}
        </ul>
    </li>;
}
