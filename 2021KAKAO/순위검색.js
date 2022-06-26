function solution(info, querys) {
    const lang = ['cpp', 'java', 'python', '-'];
    const job = ['backend', 'frontend', '-'];
    const career = ['junior', 'senior', '-'];
    const food = ['chicken', 'pizza', '-'];
    const isSorted = new Map();
    const map = new Map();

    lang.forEach((l) => {
        job.forEach((j) => {
            career.forEach((c) => {
                food.forEach((f) => {
                    map.set(l + j + c + f, []);
                    isSorted.set(l + j + c + f, false);
                });
            });
        });
    });

    info.forEach((s) => {
        s = s.split(' ');
        const item = s.pop();
        createKeys(0, '', s).forEach((key) => {
            const value = map.get(key);
            value.push(item * 1);
            map.set(key, value);
        });
    });
    return querys.map((query) => {
        const [str, score] = query.replace(/ and /g, '').split(' ');
        const arr = map.get(str);
        if (!isSorted.get(str)) {
            isSorted.set(str, true);
            arr.sort((a, b) => a - b);
            map.set(str, arr);
        }
        return arr.length - lowerBound(score * 1, arr);
    });
}
function lowerBound(x, arr) {
    let lo = 0,
        hi = arr.length;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (arr[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
function createKeys(index, s, info) {
    if (index === 4) {
        return s;
    }
    let ret = [];
    ret.push(createKeys(index + 1, s + info[index], info));
    ret.push(createKeys(index + 1, s + '-', info));
    return ret.flat();
}
console.log(
    solution(
        [
            'java backend junior pizza 150',
            'python frontend senior chicken 210',
            'python frontend senior chicken 150',
            'cpp backend senior pizza 260',
            'java backend junior chicken 80',
            'python backend senior chicken 50',
        ],
        [
            'java and backend and junior and pizza 100',
            'python and frontend and senior and chicken 200',
            'cpp and - and senior and pizza 250',
            '- and backend and senior and - 150',
            '- and - and - and chicken 100',
            '- and - and - and - 150',
        ],
    ),
);

/* 
        정답코드
        function solution(info, querys) {
    let map = new Map();
    for(let i = 0,len = info.length;i<len;i++) {
        map = makeMap('',0,info[i].split(' '),map);
    }
    for(const elements of map) {
        const [key,value] = elements;
        if(value.length >=2) value.sort((a,b) => a-b);
    }
    return querys.map((query) => {
        const [str, score] = query.replace(/ and /g,'').split(' ');
        const arr = map.get(str);
        if(!arr) return 0;
        const iter = lower_bound(arr, score-0);
        if (iter === 0) return arr.length;
        else if (iter === arr.length) return 0;
        else return arr.length - iter;
    });
}
function lower_bound(arr, value) {
    let lo = 0,
        hi = arr.length;
    while (lo < hi) {
        const mid = parseInt((lo + hi) / 2);
        if (arr[mid] >= value) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
function makeMap(str, depth, info, map) {
    if (depth === 4) {
        const key = map.get(str);
        if(!key) map.set(str,[info[4]-0]);
        else key.push(info[4]-0);
        return map;
    }
    map = makeMap(str + "-", depth + 1, info, map);
    map = makeMap(str + info[depth], depth + 1, info, map);
    return map;
}

*/
