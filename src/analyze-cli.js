import fs from 'node:fs';
import { analyze } from './analyze.js';

const source = fs.readFileSync(process.argv[2], 'utf8');
const tree = analyze(source);
console.log(JSON.stringify(tree, null, 2));
