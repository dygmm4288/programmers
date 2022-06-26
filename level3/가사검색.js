/* /* const MAXLEN = 10000;
function solution(words, queries) {
    const queryMap = new Map();

    const lenArr = Array.from({ length: MAXLEN }, () => []);
    const wordN = words.length;
    for (let i = 0; i < wordN; i++) {
        lenArr[words[i].length].push(words[i]);
    }

    return queries.map((query) => {
        if (queryMap.has(queries)) return queryMap.get(queries);

        const len = query.length;
        let ret = 0;
        // 접두사 아니면 접미사라는데
        /* if (query[0] === '?') {
            // 처음이 ? 이면 접두사인데 
            ret = lenArr[len].filter((word) => {
                let idx = 0;
                while (idx < len) { // ?을 지나고 나머지들을 확인해야함
            
                    if (query[idx] !== word[idx] && ) return false;
                    idx++;
                }
                return true;
            }).length;
        } else {
            // 끝에가 ? 이면 접미사인데
            ret = lenArr[len].filter((word) => {
                let idx = len - 1;
                while (query[idx] !== '?') {
                    if (query[idx] !== word[idx]) return false;
                    idx--;
                }
                return true;
            }).length;
        } 
        ret = lenArr[len].filter((word) => {
            let idx = 0;
            while (idx < len) {
                if (query[idx] !== word[idx] && query[idx] !== '?')
                    return false;
                idx++;
            }
            return true;
        }).length;
        queryMap.set(query, ret);
        return ret;
    });
}
console.log(
    solution(
        ['frodo', 'front', 'frost', 'frozen', 'frame', 'kakao'],
        ['fro??', '????o', 'fr???', 'fro???', 'pro?'],
    ),
);
String.prototype.toNumber = function () {
    return this.charCodeAt() - 97;
};
class Node {
    constructor(ch) {
        this.children = new Map();
        this.terminal = false;
        this.ch = ch;
        this.count = 0;
    }
    /* find(str, idx, predi, set) {
        if (predi(str, idx)) {
            return this.terminal ? 1 : 0;
        }
        let ret = 0;
        if (str[idx] === '?') {
            this.children.forEach((value) => {
                ret += value.find(str, idx + set, predi, set);
            });
        } else {
            const nextNode = this.children.get(str[idx].toNumber());
            ret += nextNode ? nextNode.find(str, idx + set, predi, set) : 0;
        }
        return ret;
    } 
}
function insert(word, start, set, predi, root) {
    const len = word.length;
    let prevNode = root;
    let nextNode = null;
    for (let idx = start; predi(len, idx); idx += set) {
        nextNode =
            prevNode.children.get(word[idx].toNumber()) || new Node(word[idx]);
        prevNode.count += 1;
        prevNode.children.set(word[idx].toNumber(), nextNode);
        prevNode = nextNode;
    }
    nextNode.terminal = true;
    return root;
}
function find(word, start, set, predi, root) {
    const len = word.length;
    let prevNode = root;
    let nextNode = null;

    for (let idx = start; predi(len, idx); idx += set) {
        if (word[idx] === '?') return prevNode.count;
        nextNode = prevNode.children.get(word[idx].toNumber());
        prevNode = nextNode;
    }
    return 1;
}
function solution(words, queries) {
    const MAX = 10001;
    const prefix = Array.from({ length: MAX });
    const sufix = Array.from({ length: MAX });
    const lenArr = Array.from({ length: MAX }, () => 0);

    const prefixPredi = (len, idx) => len !== idx;
    const sufixPredi = (len, idx) => idx !== -1;

    words.forEach((word) => {
        const n = word.length;
        lenArr[n] += 1;
        prefix[n] = insert(word, 0, 1, prefixPredi, prefix[n] || new Node());
        sufix[n] = insert(
            word,
            word.length - 1,
            -1,
            sufixPredi,
            sufix[n] || new Node(),
        );
    });
    console.log(prefix[5]);
    console.log(sufix[6]);
    const uniq = new Map();
    const ret = queries.map((query) => {
        if (uniq.has(query)) return uniq.get(query);
        const n = query.length;
        const allWild = '?'.repeat(n);
        let finding;
        if (query[0] === '?') {
            // ?가 접두사일 경우
            finding = sufix[n]
                ? find(query, n - 1, -1, sufixPredi, sufix[n])
                : 0;
        } else if (query === allWild) {
            finding = lenArr[n];
        } else {
            finding = prefix[n] ? find(query, 0, 1, prefixPredi, prefix[n]) : 0;
        }   
        uniq.set(query, finding);
        return finding;
    });
    return ret;
}
console.log(
    solution(
        ['frodo', 'front', 'frost', 'frame', 'frozen', 'kakao'],
        ['fro??', '????o', 'fr???', 'fro???', 'pro?'],
    ),
);
 */
/* String.prototype.toNumber = function () {
    return this.charCodeAt() - 97;
};
class Node {
    constructor() {
        this.children = new Map();
        this.count = 0;
    }
}
function insert(word, start, set, predi, root) {
    const n = word.length;
    let prevNode = root;
    let nextNode = null;
    for (let idx = start; predi(idx, n); idx += set) {
        const id = word[idx].toNumber();
        nextNode = prevNode.children.get(id) || new Node();
        prevNode.count += 1;
        prevNode.children.set(id, nextNode);
        prevNode = nextNode;
    }
    return root;
}
function find(word, start, set, predi, root) {
    const n = word.length;
    let prevNode = root;
    let idx = start;
    while (predi(idx, n)) {
        if (word[idx] === '?') return prevNode.count;
        prevNode = prevNode.children.get(word[idx].toNumber());
        idx += set;
    }
    return prevNode.count;
}

function solution(words, queries) {
    const MAX = 10001; // 이거 아냐
    const prefix = Array.from({ length: MAX }); // 이게 문제인가
    const suffix = Array.from({ length: MAX }); // 너무 많이 잡았나? 그럼 저번것도 안돼야지
    const lenArr = Array.from({ length: MAX }, () => 0);
    const prefixPredi = (idx, n) => idx < n; // 이것도 아냐
    const suffixPredi = (idx) => idx >= 0; // 이것도 아냐

    words.forEach((word) => {
        const n = word.length;
        lenArr[n] += 1;

        prefix[n] = insert(word, 0, 1, prefixPredi, prefix[n] || new Node());
        suffix[n] = insert(
            word,
            n - 1,
            -1,
            suffixPredi,
            suffix[n] || new Node(),
        );
    });
    console.log(prefix[5]);
    console.log(suffix[5]);
    const uniq = new Map();
    return queries.map((query) => {
        const n = query.length;
        if (uniq.has(query)) return uniq.get(query);
        let finding;
        const allWild = '?'.repeat(n);
        if (query[0] === '?') {
            finding = suffix[n]
                ? find(query, n - 1, -1, suffixPredi, suffix[n])
                : 0;
        } else if (query === allWild) {
            finding = lenArr[n];
        } else {
            finding = prefix[n] ? find(query, 0, 1, prefixPredi, prefix[n]) : 0;
        }
        uniq.set(query, finding);
        return finding;
    });
}
console.log(
    solution(
        ['frodo', 'front', 'frost', 'frame', 'frozen', 'kakao'],
        ['fro??', '????o', 'fr???', 'fro???', 'pro?', '????t'],
    ),
);
 */

String.prototype.toNumber = function () {
    return this.charCodeAt() - 97;
};
const ALPHA = 26;
class Node {
    constructor() {
        this.count = 0;
        this.children = Array.from({ length: ALPHA }, () => null);
    }
}
function insert(word, root, start, set, predi) {
    const n = word.length;
    let prevNode = root;
    for (let idx = start; predi(idx, n); idx += set) {
        const wordId = word[idx].toNumber();
        if (!prevNode.children[wordId]) {
            prevNode.children[wordId] = new Node();
        }
        prevNode = prevNode.children[wordId];
        prevNode.count += 1;
    }
    root.count += 1;
    return root;
}
function find(query, root, start, set, predi) {
    const n = query.length;
    let prevNode = root;
    for (let idx = start; predi(idx, n); idx += set) {
        if (query[idx] === '?') return prevNode.count;
        const wordId = query[idx].toNumber();
        if (!prevNode.children[wordId]) return 0;
        prevNode = prevNode.children[wordId];
    }
    return 1;
}
function solution(words, queries) {
    const MAX = 10001;
    const prefix = Array.from({ length: MAX });
    const suffix = Array.from({ length: MAX });
    const lenArr = Array.from({ length: MAX }, () => 0);
    const prefixPredi = (idx, n) => idx !== n;
    const suffixPredi = (idx) => idx !== -1;

    words.forEach((word) => {
        const n = word.length;

        prefix[n] = insert(word, prefix[n] || new Node(), 0, 1, prefixPredi);
        suffix[n] = insert(
            word,
            suffix[n] || new Node(),
            n - 1,
            -1,
            suffixPredi,
        );
    });
    const uniq = new Map();
    return queries.map((query) => {
        if (uniq.has(query)) return uniq.get(query);
        const n = query.length;
        const allWild = '?'.repeat(n);
        let finding;

        if (query === allWild) {
            finding = lenArr[n];
        } else if (query[0] === '?') {
            finding = suffix[n]
                ? find(query, suffix[n], n - 1, -1, suffixPredi)
                : 0;
        } else {
            finding = nprefix[n]
                ? find(query, prefix[n], 0, 1, prefixPredi)
                : 0;
        }
        uniq.set(query, finding);
        return finding;
    });
}
console.log(
    solution(
        ['frodo', 'front', 'frost', 'frame', 'frozen', 'kakao'],
        ['fbo??'],
    ),
);
