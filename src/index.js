#!/usr/bin/env node
import * as fs from 'fs';
import React from 'react';
import * as ReactDOM from 'react-dom/server';
import { join } from 'path';
import { Folder } from './components/Folder.js';


const tree = {
    path: 'ROOT',
    children: [],
};
let curr = tree;
const ignored = ['node_modules', '.git']

const config = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const featurePatterns = config.patterns;
function walk(path) {
    const kind = fs.statSync(path).isDirectory()? 'Folder' : 'File';
    const node = {
        path,
        kind,
        features: [],
        children: [],
    };
    if (kind == 'File') {
        const source = fs.readFileSync(path, 'utf8');
        featurePatterns.forEach(pattern => {
            if (source.includes(pattern[0]) && !node.features.includes(pattern[1])) {
                node.features.push(pattern[1]);
            }    
        });
        node.loc = source.split('\n').length;
    }
    curr.children.push(node);

    if (kind == 'Folder') {
        const files = fs.readdirSync(path);

        const prev = curr;
        curr = node;
        files.forEach(file => {
            if (ignored.includes(file)) return;
            const subPath = join(path, file);
            walk(subPath);
        });
        curr = prev;
    };
}

walk(config.path);





console.log(ReactDOM.renderToString(<Folder folder={tree} />));
