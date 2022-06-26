function solution(p) {
    if (p === '') return p;

    const [u, v] = split(p);
    if (isCorrect(u)) return u + solution(v);

    let ret = '(';
    ret += solution(v);
    ret += ')';

    for (let i = 1; i < u.length - 1; i++) {
        ret += u[i] === '(' ? ')' : '(';
    }

    return ret;
}

function split(w) {
    const cnt = [0, 0];
    const get = (s) => (s === '(' ? 0 : 1);
    let pivot = 0;
    cnt[get(w[0])] += 1;

    for (let i = 1; i < w.length; i++) {
        cnt[get(w[i])] += 1;
        if (cnt[0] === cnt[1]) {
            pivot = i;
            break;
        }
    }
    return [w.slice(0, pivot + 1), w.slice(pivot + 1, w.length)];
}
function isCorrect(w) {
    const stack = [];
    for (let i = 0; i < w.length; i++) {
        if (w[i] === '(') stack.push(w[i]);
        else if (w[i] === ')') {
            if (stack.length === 0) return false;
            stack.pop();
        }
    }
    return stack.length === 0;
}
