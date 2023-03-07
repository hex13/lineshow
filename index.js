#!/usr/bin/env node
const fs = require('fs');
const React = require('react');
const ReactDOM = require('react-dom/server');
const { join } = require('path');

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

function Loc({ value }) {
    const colors = ['#3b3', '#380', '#fa0', '#f60', '#f00'];
    const color = colors[Math.min(~~(value / 200), colors.length - 1)];
    return <span style={{color}}>{value} loc</span>;
}

function Feature({ feature }) {
    return <span style={{margin: 2, border: '1px solid grey', background: '#fc8'}}>{ feature }</span>;
}
function File({ file }) {
    return <li>
        {file.path.split('/').pop()}
        &nbsp;<Loc value={file.loc} />
        {file.features.map(feature => <Feature feature={feature} />)}
    </li>
}
function Folder({ folder }) {
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

console.log(ReactDOM.renderToString(<Folder folder={tree} />));
