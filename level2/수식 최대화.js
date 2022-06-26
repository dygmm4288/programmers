/* 이전 정답코드
function solution(expression) {
    const operators = ['*', '-', '+'];
    const priorities = [
        [0, 1, 2],
        [0, 2, 1],
        [1, 0, 2],
        [1, 2, 0],
        [2, 1, 0],
        [2, 0, 1],
    ].map((arr) => arr.map((n) => operators[n]));
    const exprArray = InitArray(expression);

    return Math.max(
        ...priorities.map((priority) =>
            Math.abs(priority.reduce(calc, [...exprArray])),
        ),
    );
}

function calc(expr, opr) {
    const operating = (opr, opr1, opr2) =>
        opr === '+' ? opr1 + opr2 : opr === '-' ? opr1 - opr2 : opr1 * opr2;

    for (let i = 1, len = expr.length; i < len; i += 2) {
        const opr1 = expr[i - 1];
        const opr2 = expr[i + 1];
        if (opr === expr[i]) {
            expr.splice(i - 1, 3, operating(opr, opr1, opr2));
            i -= 2;
        }
    }
    return expr;
}
function InitArray(expr) {
    let index = 0;
    let len = expr.length;
    const ret = [];

    const isOperator = (s) => s === '*' || s === '-' || s === '+';

    let number = '';
    while (index <= len) {
        if (expr[index] === undefined) {
            ret.push(parseInt(number));
            break;
        } else {
            if (isOperator(expr[index])) {
                ret.push(parseInt(number), expr[index]);
                number = '';
            } else {
                number += expr[index];
            }
            index++;
        }
    }
    return ret;
}
*/
function solution(expression) {
    const priorities = [
        [0, 1, 2],
        [0, 2, 1],
        [1, 0, 2],
        [1, 2, 0],
        [2, 0, 1],
        [2, 1, 0],
    ].map((priority) => priority.map((p) => ['*', '-', '+'][p]));

    const initArray = (expression) => {
        let number = '';
        let index = 0;
        let ret = [];
        const isOperator = (expr) =>
            expr === '*' || expr === '+' || expr === '-';
        while (index < expression.length) {
            if (isOperator(expression[index])) {
                ret.push(parseInt(number), expression[index]);
                number = '';
                index++;
            } else {
                number += expression[index];
                index++;
            }
        }
        ret.push(number);
        return ret;
    };

    const exprArr = initArray(expression);

    const ret = priorities.map((priority) => {
        let expr = [...exprArr];
        const calc = (opr, opr1, opr2) =>
            opr === '+'
                ? opr1 * 1 + opr2 * 1
                : opr === '*'
                ? opr1 * opr2
                : opr1 * 1 - opr2 * 1;
        priority.forEach((operator) => {
            for (let i = 1; i < expr.length; i += 2) {
                if (expr[i] === operator) {
                    let opr1 = expr[i - 1];
                    let opr2 = expr[i + 1];
                    expr.splice(i - 1, 3, calc(operator, opr1, opr2));
                    i -= 2;
                }
            }
        });

        return Math.abs(expr[0]);
    });

    return Math.max(...ret);
}
