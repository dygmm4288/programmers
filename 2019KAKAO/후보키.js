/* 
    후보키
    "비트마스크"를 이용한 문제풀이 -> 특히 부분집합
*/

/* 
    // 유일성
    릴레이션에 있는 모든 튜플에 대해 유일하게 식별되어야 한다
    // 최소성
    유일성을 가진 키를 구성하는 속성 중 하나라도 제외하는 경우
    유일성을 깨지는 것을 의미

*/
function solution(relation) {
    //  최소성을 만족하는 가?

    let ret = 0;

    const n = relation[0].length;

    for (let subset = (1 << n) - 1; subset; subset -= 1) {
        if (isUniq(subset, relation)) {
            let flag = true;

            for (
                let temp = (subset - 1) & subset;
                temp;
                temp = (temp - 1) & subset
            ) {
                if (!isUniq(temp, relation)) {
                    flag = false;
                    break;
                }
            }
            if (flag) ret += 1;
        }
    }
    return ret;
}
function isUniq(subset, relation) {
    const temp = relation.map((rel) =>
        rel.reduce((str, col, i) => {
            if (1 << i && subset) str += col;
            return str;
        }, ''),
    );
    const uniq = new Set([...temp]);
    return relation.length === uniq.size;
}

/* 
    정답 코드
*/
function solution(relation) {
    let ret = [];
    const n = relation[0].length;
    for (let subset = (1 << n) - 1; subset; subset--) {
        if (isUniq(subset, relation)) {
            let flag = true;
            for (
                let tempSet = (subset - 1) & subset;
                tempSet;
                tempSet = (tempSet - 1) & subset
            ) {
                if (isUniq(tempSet, relation)) {
                    flag = false;
                    break;
                }
            }
            if (flag) ret.push(subset);
        }
    }
    return ret.length;
}
function isUniq(combi, relation) {
    const temp = relation.map((rel) => {
        return rel.reduce((str, col, i) => {
            if ((1 << i) & combi) str += col;
            return str;
        }, '');
    });
    const uniq = new Set([...temp]);
    return relation.length === uniq.size;
}
