/* 
 트라이
*/
class Node {
    constructor() {
        this.size = 0;
        this.children = new Map();
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }
    insert(s) {
        let cur = this.root;
        for (const char of s) {
            if (!cur.children.has(char)) {
                cur.children.set(char, new Node());
            }
            cur.size += 1;
            cur = cur.children.get(char);
        }
    }
    find(s) {
        let cur = this.root;
        for (let i = 0, len = s.length; i < len; i++) {
            console.log({ cur }, s[i]);
            if (s[i] === '?') return cur.size;
            if (cur === undefined) return 0;
            cur = cur.children.get(s[i]);
        }
    }
}

function solution(words, queries) {
    const MAX = 10001;
    const trie = Array.from({ length: MAX }, () => new Trie());
    const reverseTrie = Array.from({ length: MAX }, () => new Trie());
    const allWildArr = Array.from({ length: MAX }, () => 0);

    words.forEach((word) => {
        const length = word.length;
        trie[length].insert(word);
        reverseTrie[length].insert(word.split('').reverse().join(''));
        allWildArr[length]++;
    });
    const uniq = new Map();
    return queries.map((query) => {
        if (uniq.has(query)) return uniq.get(query);

        const length = query.length;
        const allWild = '?'.repeat(length);
        let ret;
        if (query === allWild) {
            ret = allWildArr[length];
        } else if (query[0] === '?') {
            query = query.split('').reverse().join('');
            ret = reverseTrie[length].find(query);
        } else {
            ret = trie[length].find(query);
        }
        uniq.set(query, ret);
        return ret;
    });
}
console.log(
    solution(
        ['frodo', 'front', 'frost', 'frozen', 'frame', 'kakao'],
        ['fro??', '????o', 'fr???', 'fro???', 'pro?'],
    ),
);
/* 
    정답 코드
    
String.prototype.toNumber = function () {
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
        if (!prevNode.children.has(word[idx].toNumber())) return 0;
        prevNode = prevNode.children.get(word[idx].toNumber());
        idx += set;
    }
    return prevNode.count;
}

function solution(words, queries) {
    const MAX = 10001; // 이거 아냐
    const prefix = Array.from({ length: MAX });
    const suffix = Array.from({ length: MAX });
    const lenArr = Array.from({ length: MAX }, () => 0);
    const prefixPredi = (idx, n) => idx < n;
    const suffixPredi = (idx) => idx >= 0;

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
*/
