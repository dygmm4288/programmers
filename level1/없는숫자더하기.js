/* 
정답코드
function solution(numbers) {
    return [0,1,2,3,4,5,6,7,8,9].filter(v => !numbers.includes(v)).reduce((a,c) => a  + c);
 */
