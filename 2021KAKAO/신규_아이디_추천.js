function solution(new_id) {
    const rule1 = (id) => id.replace(/[A-Z]/g, (s) => s.toLowerCase());
    const rule2 = (id) => id.replace(/[^a-z\-_.0-9]/g, () => '');
    const rule3 = (id) => id.replace(/[.]{2,}/g, () => '.');
    const rule4 = (id) => id.replace(/[.]$|^[.]/g, () => '');
    const rule5 = (id) => (id.length === 0 ? 'a' : id);
    const rule6 = (id) => (id.length >= 16 ? id.slice(0, 15) : id);
    const rule6_2 = (id) =>
        id[id.length - 1] === '.' ? id.slice(0, id.length - 1) : id;
    const rule7 = (id) =>
        id.length <= 2 ? id.padEnd(3, id[id.length - 1]) : id;

    const recommend = compose(
        rule1,
        rule2,
        rule3,
        rule4,
        rule5,
        rule6,
        rule6_2,
        rule7,
    );
    return recommend(new_id);
}
function compose() {
    let fns = arguments;
    let ends = fns.length;
    return function () {
        let i = 0;
        let result = fns[i].apply(this, arguments);
        while (i < ends) {
            result = fns[i].call(this, result);

            i++;
        }
        return result;
    };
}

/* 
    정답코드
 */
function solution(new_id) {
    const rule1 = (id) =>
        id.replace(/[A-Z]/g, (new_id) => new_id.toLowerCase());
    const rule2 = (id) => id.replace(/[^a-z0-9_.-]/g, () => '');
    const rule3 = (id) => id.replace(/[.]{2,}/g, () => '.');
    const rule4 = (id) => id.replace(/^[.]|[.]$/g, () => '');
    const rule5 = (id) => (id.length <= 0 ? 'a' : id);
    const rule6 = (id) => (id.length > 15 ? id.substr(0, 15) : id);
    /*const rule7 = id => {
            let a   nswer = id;
            while (answer.length < 3) {
                answer += answer[answer.length - 1];
            }
            return answer;
        };*/
    const rule7 = (id) =>
        id.length < 3 ? id.padEnd(3, id[id.length - 1]) : id;
    const answer = compose(
        rule1,
        rule2,
        rule3,
        rule4,
        rule5,
        rule6,
        rule4,
        rule7,
    );
    return answer(new_id);
}
function compose(/*functions*/) {
    let fns = arguments;
    let ends = fns.length;
    return function () {
        let i = 0;
        let result = fns[i].apply(this, arguments);
        while (i < ends) {
            result = fns[i].call(this, result);
            i++;
        }
        return result;
    };
}
