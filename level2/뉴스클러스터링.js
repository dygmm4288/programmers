function solution(str1, str2) {
    const set1 = makeSet(str1),
        set2 = makeSet(str2);
    const union = new Set([...set1, ...set2]);
    let multipleUnion = 0,
        multipleIntersection = 0;
    for (const subset of union) {
        const lenA = set1.filter((a) => a === subset).length;
        const lenB = set2.filter((b) => b === subset).length;

        multipleIntersection += Math.min(lenA, lenB);
        multipleUnion += Math.max(lenA, lenB);
    }
    const max = 65536;
    return multipleUnion === 0
        ? max
        : Math.floor((multipleIntersection / multipleUnion) * max);
}
function makeSet(str) {
    let ret = [];
    for (let i = 0; i < str.length - 1; i++) {
        let tmp = str[i] + str[i + 1];
        if (/[a-zA-Z]{2}/.test(tmp)) ret.push(tmp.toLowerCase());
    }
    return ret;
}
