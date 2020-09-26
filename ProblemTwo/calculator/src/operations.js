const operators = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT',
    MULTIPLY: 'MULTIPLY',
    DIVIDE: 'DIVIDE',
}



function getOperation(operator){
    return operationMap[operator];
}

function Add(a,b){
    return a + b;
}


function Subtract(a,b){
    return b - a;
}

function Multiply(a,b){
    return a * b;
}

function Divide(a,b){
    return b / a;
}

const operationMap = {
    [operators.ADD] : Add,
    [operators.SUBTRACT] : Subtract,
    [operators.MULTIPLY] : Multiply,
    [operators.DIVIDE] : Divide,
}

export {operators, getOperation}