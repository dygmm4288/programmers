function solution(orders, course) {
    orders = orders.map((order) => order.split('').sort());
    return course
        .reduce((a, c) => {
            const [map, best] = generate(orders, c);
            if (best < 2) return a;
            let ret = [];
            map.forEach((value, key) => {
                if (value === best) ret.push(key);
            });
            return a.concat(ret);
        }, [])
        .sort();
}
function generate(sorted, course) {
    const ret = new Map();
    let best = -1;

    sorted.forEach((order) => {
        getCombi(-1, course, order.length, order, []).forEach((combi) => {
            if (!ret.has(combi)) ret.set(combi, 0);
            const nextCount = ret.get(combi) + 1;
            ret.set(combi, nextCount);
            best = Math.max(best, nextCount);
        });
    });
    return [ret, best];
}
function getCombi(here, pick, n, order, path) {
    if (pick === 0) {
        return path.join('');
    }
    if (pick > n) {
        return [];
    }
    let ret = [];
    for (let next = here + 1; next < n; next++) {
        path.push(order[next]);
        ret.push(getCombi(next, pick - 1, n, order, [...path]));
        path.pop();
    }
    return ret.flat();
}
