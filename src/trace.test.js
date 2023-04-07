import { trace } from './trace.js';

const source = `
function add(a, b) {
    return a + b;
}

function two() {
    return 2;
}

async function foo() {
    const a = 3;
    return add(two(), 3) + 10;
}

for (let i = 0; i < 10; i++) {
    console.log("i = " + i);
}


console.log("Result", foo());
`;
trace(source);