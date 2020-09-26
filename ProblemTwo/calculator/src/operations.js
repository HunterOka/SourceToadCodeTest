const operators = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT',
    MULTIPLY: 'MULTIPLY',
    DIVIDE: 'DIVIDE',
}

const operationMap = {
    [operators.ADD] : Add,
    [operators.SUBTRACT] : Subtract,
    [operators.MULTIPLY] : Multiply,
    [operators.DIVIDE] : Divide,
}

function getOperation(operator){
    return operationMap[operator];
}

function Add(a, b){
    return a + b;
}

function Subtract(a, b){
    return a - b;
}

function Multiply(a, b){
    return a * b;
}

function Divide(a, b){
    return a / b;
}

export {operators, getOperation}