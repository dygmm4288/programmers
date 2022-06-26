function solution(fees, records) {
    // 입/출차 기록

    const mapping = new Map();

    records.forEach((record) => {
        const [time, number, enter] = record.split(' ');

        if (!mapping.has(number)) {
            mapping.set(number, []);
        }
        mapping.set(number, [...mapping.get(number), time]);
    });

    const [basic_time, basic_fee, unit_time, unit_fee] = fees;

    const compare = (a, b) => parseInt(a[0]) - parseInt(b[0]);

    return [...mapping].sort(compare).map(([number, enter_log]) => {
        if (enter_log.length % 2 === 1) enter_log.push('23:59');
        let acc_time = 0;
        for (let i = 0; i < enter_log.length; i += 2) {
            acc_time +=
                convertTime(enter_log[i + 1]) - convertTime(enter_log[i]);
        }
        if (acc_time <= basic_time) return basic_fee;
        return (
            basic_fee +
            Math.ceil((acc_time - basic_time) / unit_time) * unit_fee
        );
    });
}
function convertTime(string) {
    const [hh, mm] = string.split(':');
    return hh * 60 + mm * 1;
}

/* 
    정답코드

    function calcTime(time) {
    const [hh, mm] = time.split(':');
    return hh * 60 + mm * 1;
}

function solution(fees, records) {
    const lastTime = 23 * 60 + 59;
    const calcFee = ((dt, df, ut, uf) => (time) => {
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
 */
