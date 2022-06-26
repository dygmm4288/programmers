/* 이전코드
const solution = (priorities, location) => {
    const ready = priorities.map((v, i) => ({ priority: v, location: i }));
    let count = 0;
    while (ready.length !== 0) {
        const shift = ready.shift();

        if (ready.find((v) => v.priority > shift.priority)) {
            ready.push(shift);
        } else {
            count++;
            if (shift.location === location) return count;
        }
    }
};
*/ class Queue {
    constructor(queue) {
        this.queue = queue || [];
        this.front = 0;
        this.rear = queue.length || 0;
    }
    enqueue(value) {
        this.queue[this.rear++] = value;
    }
    dequeue() {
        const value = this.queue[this.front];
        delete this.queue[this.front];
        this.front++;
        return value;
    }
    some(predi) {
        this.queue.some(predi);
    }
}
function solution(priorities, location) {
    const queue = new Queue(
        priorities.map((p, i) => ({
            location: i,
            priority: p,
        })),
    );

    priorities.sort((a, b) => b - a);
    let count = 0;

    while (true) {
        const top = queue.dequeue();
        if (top.priority < priorities[count]) {
            queue.enqueue(top);
        } else {
            count++;
            if (location === top.location) return count;
        }
    }
}
