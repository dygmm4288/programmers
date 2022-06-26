function solution(expression) {
    const operators = ['*', '-', '+'];
    const priorities = [
        [0, 1, 2],
        [0, 2, 1],
        [1, 0, 2],
        [1, 2, 0],
        [2, 0, 1],
        [2, 1, 0],
    ];
    const exprArray = InitArray(expression);
    return Math.max(
        ...priorities.map((priority) => {
            return Math.abs(
                priority.reduce(
                    (expr, p) => {
                        const opr = operators[p];
                        for (let i = 1; i < expr.length; i += 2) {
                            const opr1 = expr[i - 1];
                            const opr2 = expr[i + 1];
                            if (opr === expr[i]) {
                                expr.splice(i - 1, 3, calc(opr, opr1, opr2));
                                i -= 2;
                            }
                        }
                        return expr;
                    },
                    [...exprArray],
                ),
            );
        }),
    );
}
function calc(operator, a, b) {
    return operator === '+' ? a + b : operator === '-' ? a - b : a * b;
}
function InitArray(expression) {
    let index = 0;
    let len = expression.length;
    let number = '';
    const ret = [];

    const IsOperator = (s) => s === '*' || s === '-' || s === '+';

    while (index <= len) {
        if (expression[index] === undefined) {
            ret.push(parseInt(number));
            break;
        }
        if (IsOperator(expression[index])) {
            ret.push(parseInt(number));
            number = '';
            ret.push(expression[index]);
        } else {
            number += expression[index];
        }
        index++;
    }
    return ret;
}
function log(x) {
    console.log(x);
    return x;
}
console.log(solution('100-200*300-500+20'));

/* 
정답코드

*/
function solution(expression) {
    const operator = ['+', '-', '*'];
    const priorities = [
        [0, 1, 2],
        [0, 2, 1],
        [1, 0, 2],
        [1, 2, 0],
        [2, 1, 0],
        [2, 0, 1],
    ];
    return Math.max(
        ...priorities.map((priority) => {
            return Math.abs(
                priority.reduce(
                    (expr, p) => calc(expr, operator[p]),
                    [...initArray(expression)],
                )[0],
            );
        }),
    );
}
function operate(oprt, a, b) {
    a = parseInt(a);
    b = parseInt(b);
    if (oprt === '+') return a + b;
    else if (oprt === '-') return a - b;
    else return a * b;
}
function calc(expr, operator) {
    for (let i = 1; i < expr.length; i += 2) {
        const opr1 = expr[i - 1],
            opr2 = expr[i + 1];
        if (expr[i] === operator) {
            expr.splice(i - 1, 3, operate(operator, opr1, opr2));
            i -= 2;
        }
    }
    return expr;
}
function initArray(expression) {
    const ret = [],
        len = expression.length;
    let i = 0,
        number = '';
    while (i < len) {
        if (!isNaN(expression[i])) {
            number += expression[i];
        } else {
            ret.push(number);
            number = '';
            ret.push(expression[i]);
        }
        i++;
    }
    ret.push(number);
    return ret;
}
