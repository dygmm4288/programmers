function solution(w, h) {
    const gcd = getGCD(w, h);
    const slope = w / gcd / (h / gcd);
    const total = w * h;
    const W = w / gcd;
    const H = h / gcd;
    if (slope === 1) return total - (w * h) / gcd;
    else if (Number.isInteger(slope)) {
        return total - gcd * slope;
    } else if (!Number.isInteger(slope)) {
        return total - (W + H - 1) * gcd;
    } else {
        return 0;
    }
}
const getGCD = (a, b) => {
    while (b !== 0) {
        let r = a % b;
        a = b;
        b = r;
    }
    return a;
};

function solution(w, h) {
    const slope = -(h / w);
    const equation = (x) => slope * x + h;
    let ret = 0;
    for (let i = 1; i <= w; i++) {
        ret += Math.floor(equation(i));
    }
    return ret * 2;
}
