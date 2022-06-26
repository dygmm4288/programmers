// 개인적으로 최적화 했으면 하는 문제
function solution(orders, course) {
    orders = orders.map((order) => order.split('').sort());
    console.log(orders);
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
function log(x) {
    console.log(x);
    return x;
}
console.log(
    solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]),
);
console.log(
    solution(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5]),
);
console.log(solution(['XYZ', 'XWY', 'WXA'], [2, 3, 4]));
/* 
    정답코드

function solution(orders, course) {
    //spread :: [[String]] -> [String]
    const spread = (arr) => arr.reduce((acc, cur) => acc.concat(cur), []);
    //anticipate :: [String] -> Number -> [String]
    const anticipate = (orders) => (number) =>
        spread(
            orders.map((order) =>
                getCombi(order.split(''), number).map((item) =>
                    item.sort().join(''),
                ),
            ),
        );

    //plusCount :: Case -> Case;
    const plusCount = (course) => course.plusCount(course.getCount());
    //createCourse :: [String] -> {Case};
    const createCourse = (anticipated) =>
        anticipated.reduce(
            (cases, item) => {
                cases[item] = cases[item]
                    ? plusCount(cases[item])
                    : new Case(item);
                if (cases.max < cases[item].getCount())
                    cases.max = cases[item].getCount();
                return cases;
            },
            { max: 0 },
        );
    //search :: {Case} -> [String]
    const search = (course) => {
        const result = [];
        for (const meal in course) {
            if (
                meal != 'max' &&
                course[meal].getCount() > 1 &&
                course[meal].getCount() === course.max
            ) {
                result.push(meal);
            }
        }
        return result;
    };

    const getCourse = anticipate(orders);
    return spread(
        course.map((c) => compose(getCourse, createCourse, search)(c)),
    ).sort();
}

function Case(name, count = 1) {
    let _name = name;
    let _count = count;

    return {
        toString: function () {
            console.log(`name is : ${_name}, count is : ${_count}`);
        },
        plusCount: function (count) {
            return Case(_name, count + 1);
        },
        getCount: function () {
            return _count;
        },
        getName: function () {
            return _name;
        },
    };
}

function getCombi(arr, k) {
    if (k === 1) return arr.map((x) => [x]);

    const result = [];

    arr.forEach((item, index, arr) => {
        const rest = arr.slice(index + 1);
        const attach = getCombi(rest, k - 1).map((combi) => [item, ...combi]);
        result.push(...attach);
    });
    return result;
}

function compose(functions) {
    let fns = arguments;
    let end = fns.length - 1;
    return function () {
        let i = 0;
        let result = fns[i].apply(this, arguments);
        while (i < end) {
            i++;
            result = fns[i].call(this, result);
        }
        return result;
    };
}
*/
