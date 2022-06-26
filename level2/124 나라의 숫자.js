const solution = (n) => {
    const result = [];
    const digit = ['4', '1', '2'];
    while (n > 0) {
        let mod = n % 3;
        let next = parseInt(n / 3);
        n = mod === 0 ? next - 1 : next;
        result.unshift(digit[mod]);
    }
    return result.join('');
};
