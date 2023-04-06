export class Counter {
    value: number;
    constructor() {
        const localVariable = 1;
        this.value = 0;
    }
    inc(amount) {
        this.value += amount;
    }
    dec(amount) {
        this.value -= amount;
    }
}

class Nevermind {
    blah(foo, bar) {
        
    }
}

function someFunction(someParam, someParam2) {
    const year = 2023;
}

export const someObject = {
    abc: 123,
};

export const someNumber = 42;

const someInternalObject = {
    foo: 8,
}