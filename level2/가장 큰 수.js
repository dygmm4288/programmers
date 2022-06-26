function solution(numbers) {
    const result = numbers
        .map((n) => n + '')
        .sort((a, b) => b + a - (a + b))
        .join('');
    if (parseInt(result) <= 0) return '0';
    return result;
}
