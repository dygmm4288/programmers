/* 
    작성된 괄호 개수는 맞는다(짝수이다.)
    짝이 맞지 않는다.
    -> 모든 괄호를 뽑아서 올바른 순서대로 배치된 괄호 문자열을 알려줘
    '('와 ')'로만 이루어진 문자열이 있다.

    균형잡힌 문자열 -> ()개수가 같은 문자열
*/
function solution(p) {
    // 입력이 빈 문자열인 경우 빈 문자열 반환
    if (p.length === 0) return p;
    // w를 두 "균형잡힌 괄호 문자열" u,v로 분리한다.
    // 단 u는 "균형잡힌 괄호 문자열"로 더이상 분리할 수 없어야 한다.
    // v는 빈 문자열이어도 상관이 없다.
    // u가 올바른 괄호 문자열이라면
    let [u, v] = split(p);

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
    let cnt = [0, 0];
    let pivot = 0;
    const get = (s) => (s === '(' ? 0 : 1);
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
function isCorrect(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') stack.push(s[i]);
        else if (s[i] === ')') {
            if (stack.length === 0) return false;
            stack.pop();
        }
    }
    return stack.length === 0;
}

console.log(solution('()))((()'));

/* 
  정답코드
*/
function solution(p) {
    var answer = '';
    if (p === '') return '';
    const splited = split(p.split(''));
    const u = splited[0];
    const v = splited[1];
    console.log({ u, v });
    if (valid(u)) return u + solution(v);
    answer += '(';
    answer += solution(v);
    answer += ')';
    return (answer += u
        .slice(1, -1)
        .split('')
        .map((v) => (v === ')' ? '(' : ')'))
        .join(''));
}
function split(list) {
    const first = list[0];
    let countF = 1;
    let countS = 0;
    for (let i = 1, len = list.length; i < len; i++) {
        if (list[i] === first) countF++;
        else if (list[i] !== first) countS++;
        if (countF === countS)
            return [list.slice(0, i + 1).join(''), list.slice(i + 1).join('')];
    }
    return '';
}
function valid(str) {
    const splited = str.split('');
    if (splited[0] === ')') return false;
    let countF = 1;
    let countS = 0;
    for (let i = 1, len = splited.length; i < len; i++) {
        if (splited[i] === '(') countF++;
        else countS++;
        if (countF < countS) return false;
    }
    return true;
}
