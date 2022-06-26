function calcTime(time) {
    const [hh, mm] = time.split(':');
    return hh * 60 + mm * 1;
}

function solution(fees, records) {
    const lastTime = 23 * 60 + 59;
    const calcFee = ((dt, df, ut, uf) => (time) => {
        console.log({ time, dt, df, ut, uf }, Math.ceil(time - dt) / ut);
        if (time < dt) return df;
        return df + Math.ceil((time - dt) / ut) * uf;
    })(...fees);
    const set = (key, value, map) => {
        map.set(key, value);
    };
    const mapCar = new Map();

    records.sort((a, b) => {
        a = a.split(' ');
        b = b.split(' ');
        return a[1] - b[1];
    });

    const stack = [];

    records.forEach((record) => {
        const [time, carNumber, enter] = record.split(' ');
        if (!mapCar.has(carNumber)) mapCar.set(carNumber, 0);

        if (enter === 'IN') {
            if (stack.length !== 0 && stack[0].carNumber !== carNumber) {
                const prevCar = stack.pop();
                set(
                    prevCar.carNumber,
                    mapCar.get(prevCar.carNumber) + lastTime - prevCar.time,
                    mapCar,
                );
            }
            stack.push({ carNumber, time: calcTime(time) });
        } else if (enter === 'OUT') {
            const prevCar = stack.pop();
            set(
                carNumber,
                mapCar.get(carNumber) + calcTime(time) - prevCar.time,
                mapCar,
            );
        }
    });

    if (stack.length !== 0) {
        const prevCar = stack.pop();
        set(
            prevCar.carNumber,
            mapCar.get(prevCar.carNumber) + lastTime - prevCar.time,
            mapCar,
        );
    }
    const ret = [];
    mapCar.forEach((accTime, key) => {
        ret.push(calcFee(accTime));
    });
    return ret;
}

solution(
    [180, 5000, 10, 600],
    [
        '05:34 5961 IN',
        '06:00 0000 IN',
        '06:34 0000 OUT',
        '07:59 5961 OUT',
        '07:59 0148 IN',
        '18:59 0000 IN',
        '19:09 0148 OUT',
        '22:59 5961 IN',
        '23:00 5961 OUT',
    ],
);
/* solution(
    [120, 0, 60, 591],
    [
        '16:00 3961 IN',
        '16:00 0202 IN',
        '18:00 3961 OUT',
        '18:00 0202 OUT',
        '23:58 3961 IN',
    ],
);
//solution([1, 461, 1, 10], ['00:00 1234 IN']);
 */
