/* 
class Node {
    constructor(value, index, prev = null, next = null) {
        this._value = value;
        this._prev = prev;
        this._next = next;
        this._index = index;
    }
    setPrev(prev) {
        this._prev = prev;
    }
    setNext(next) {
        this._next = next;
    }
    setValue(value) {
        this._value = value;
    }
}function solution(n, k, cmd) {
    const nodes = [new Node("O", 0)];
    const prevs = [];
    for (let i = 1; i < n; i++) {
        const node = new Node("O", i, nodes[i - 1]);
        nodes.push(node);
        nodes[i - 1].setNext(node);
    }
    const up = (nodes, k) => nodes[k]._prev._index;
    const down = (nodes, k) => nodes[k]._next._index;
    const move = (predi) => (nodes, k) => predi ? up(nodes, k) : down(nodes, k);

    cmd.forEach((command) => {
        const how = command[0];
        if (how === "U" || how === "D") {
            const len = command.slice(2) - 0;
            const upDown = how === "U" ? true : false;
            for (let i = 0; i < len; i++) {
                k = move(upDown)(nodes, k);
            }
        } else if (how === "C") {
            nodes[k].setValue("X");
            const cur = nodes[k];
            prevs.push(k);
            if (cur._prev !== null) {
                cur._prev.setNext(cur._next);
            }
            if (cur._next !== null) {
                cur._next.setPrev(cur._prev);
                k = cur._next._index;
            } else {
                // cur._next === null
                k = cur._prev._index;
            }
        } else {
            const back = nodes[prevs.pop()];

            back.setValue("O");
            if (back._prev !== null) back._prev.setNext(back);
            if (back._next !== null) back._next.setPrev(back);
        }
    });

    return nodes.reduce((str, cur) => (str += cur._value), "");
}
 */
/* class Node {
    constructor(idx) {
        this.idx = idx;
        this.prev = null;
        this.next = null;
    }
}
function solution(n, k, cmd) {
    // 전처리
    const table = Array.from({ length: n }, (v, i) => new Node(i));
    const ret = Array.from({ length: n }, () => 'O');

    for (let i = 1; i < n; i++) {
        table[i - 1].next = table[i];
        table[i].prev = table[i - 1];
    }
    let cur = table[0];
    for (let i = 0; i < k; i++) {
        cur = cur.next;
    }

    const stack = [];

    cmd.forEach((c) => {
        if (c[0] === 'U' || c[0] === 'D') {
            const next = c[2];
            for (let i = 0; i < next; i++) {
                cur = c[0] === 'U' ? cur.prev : cur.next;
            }
        } else if (c[0] === 'C') {
            // 해당 행 삭제 후 선택 행은 바로 다음으로 선택한다.
            ret[cur.idx] = 'X';
            stack.push(cur.idx);
            // 선택 행은 바로 다음으로 선택한다.
            if (cur.prev) cur.prev.next = cur.next;
            if (cur.next) cur.next.prev = cur.prev;
            //다만 끝 행일 경우 바로 윗 행을 선택한다.
            cur = cur.next ? cur.next : cur.prev;
        } else {
            // c[0] === 'Z'
            // 가장 마지막에 지워진 행을 원래대로 돌린다.
            // 행을 원래대로 돌리기 위해서는 지웠던 prev next를 다시 돌린다.
            const back = stack.pop();
            ret[back] = 'O';
            if (table[back].prev) table[back].prev.next = table[back];
            if (table[back].next) table[back].next.prev = table[back];
        }
    });
    return ret.join('');
} */

class Node {
    constructor() {
        this.prev = null;
        this.next = null;
        this.value = 'O';
    }
}
function solution(n, k, cmd) {
    const table = Array.from({ length: n }, () => new Node());

    for (let i = 1; i < n; i++) {
        table[i - 1].next = table[i];
        table[i].prev = table[i - 1];
    }
    console.log(table);
    let cur = table[k];
    const stack = [];
    cmd.forEach((c) => {
        if (c[0] === 'U' || c[0] === 'D') {
            const len = parseInt(c.slice(2));
            for (let i = 0; i < len; i++) {
                cur = c[0] === 'U' ? cur.prev : cur.next;
            }
        } else if (c[0] === 'C') {
            cur.value = 'X';
            stack.push(cur);
            if (cur.next && cur.prev) {
                cur.prev.next = cur.next;
                cur.next.prev = cur.prev;
                cur = cur.next;
            } else if (cur.prev) {
                // 내 다음은 없고 이전만 있는 상태
                cur.prev.next = null;
                cur = cur.prev;
            } else if (cur.next) {
                // 내 이전은 없고 내 다음만 있는 상태
                cur.next.prev = null;
                cur = cur.next;
            }
        } else {
            // c[0] === 'Z"
            const lastNode = stack.pop();
            lastNode.value = 'O';
            if (lastNode.prev) {
                lastNode.prev.next = lastNode;
            }
            if (lastNode.next) {
                lastNode.next.prev = lastNode;
            }
        }
    });

    return table.reduce((a, c) => (a += c.value), '');
}
