/* class Node {
    constructor(id, time) {
        this.time = time;
        this.id = id;
    }
}
// 우선순위 큐
class MinHeap {
    constructor() {
        this.heap = [null];
    }
    _isSmall(a, b) {
        return this.heap[a].time > this.heap[b].time;
    }
    push(value) {
        this.heap.push(value);
        let cur = this.heap.length - 1;
        let parent = Math.floor(cur / 2);

        while (parent !== 0 && this._isSmall(parent, cur)) {
            this._swap(parent, cur);
            cur = parent;
            parent = Math.floor(cur / 2);
        }
    }
    pop() {
        if (this.heap.length === 2) return this.heap.pop();

        const returnValue = this.heap[1];
        this.heap[1] = this.heap.pop();

        let cur = 1;
        let left = 2;
        let right = 3;

        while (
            (this.heap[left] && this._isSmall(left, cur)) ||
            (this.heap[right] && this._isSmall(right, cur))
        ) {
            if (this.heap[left] === undefined) {
                this._swap(cur, right);
                cur = right;
            } else if (this.heap[right] === undefined) {
                this._swap(cur, left);
                cur = left;
            } else if (this._isSmall(right, left)) {
                this._swap(cur, left);
            } else if (this._isSmall(left, right)) {
                this._swap(cur, right);
            }
            left = cur * 2;
            right = cur * 2 + 1;
        }
        return returnValue;
    }
    _swap(a, b) {
        return ([this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]);
    }
    top() {
        return this.heap[1];
    }
    isEmpty() {
        return this.heap.length === 1;
    }
    size() {
        return this.heap.length - 1;
    }
}

function solution(food_times, k) {
    let n = food_times.length;
    if (n >= k) return (k % n) + 1;

    const heap = new MinHeap();
    let ret = -1;
    let previous = 0;
    food_times.forEach((time, food) => {
        heap.push(new Node(food + 1, time));
    });

    while (k > 0) {
        const food = heap.top();
        if ((food.time - previous) * n < k) {
            k -= (food.time - previous) * n;
            n -= 1;
            previous = food.time;
        } else {
            const arr = [...heap.heap];
            arr.sort((a, b) => a.id - b.id);
            return arr[k % n].id;
        }
    }
    return ret;
}
 */

class Node {
    constructor(id, time) {
        this.id = id;
        this.time = time;
    }
}
class MinHeap {
    constructor() {
        this.heap = [null];
    }
    small(a, b) {
        return this.heap[a].time < this.heap[b].time;
    }
    swap(a, b) {
        return ([this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]);
    }
    push(node) {
        this.heap.push(node);
        let cur = this.heap.length - 1;
        let parent = Math.floor(cur / 2);

        while (parent !== 0 && this.small(cur, parent)) {
            this.swap(cur, parent);
            cur = parent;
            parent = Math.floor(cur / 2);
        }
    }
    pop() {
        if (this.heap.length === 2) return this.heap.pop();

        let ret = this.heap[1];
        this.heap[1] = this.heap.pop();

        let cur = 1;
        let left = 2;
        let right = 3;

        while (
            (this.heap[left] && this.small(left, cur)) ||
            (this.heap[right] && this.small(right, cur))
        ) {
            if (this.heap[left] === undefined) {
                this.swap(cur, right);
                cur = right;
            } else if (this.heap[right] === undefined) {
                this.swap(cur, left);
                cur = left;
            } else if (this.small(left, right)) {
                this.swap(cur, left);
                cur = left;
            } else if (this.small(right, left)) {
                this.swap(cur, right);
                cur = right;
            }
            left = cur * 2;
            right = cur * 2 + 1;
        }
        return ret;
    }
    isEmpty() {
        return this.heap.length === 1;
    }
    top() {
        return this.heap[1];
    }
}

function solution(food_times, k) {
    let n = food_times.length;

    if (n >= k) return k + 1;

    const heap = new MinHeap();
    food_times.forEach((time, food_index) => {
        heap.push(new Node(food_index + 1, time));
    });

    let previous = 0;
    let food = heap.top();

    while (k > 0 && (food.time - previous) * n <= k) {
        console.log({ food, previous, k });
        heap.pop();

        k -= (food.time - previous) * n;
        n -= 1;
        previous = food.time;
        food = heap.top();
    }
    if (heap.isEmpty()) return -1;
    const arr = [...heap.heap].slice(1).sort((a, b) => a.id - b.id);
    return arr[k % n].id;
}

console.log(solution([3, 1, 2], 5));
