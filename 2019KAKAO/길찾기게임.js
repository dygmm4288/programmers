class Node {
    constructor(value, id) {
        this.value = value;
        this.id = id;
        this.left = null;
        this.right = null;
    }
}
class Tree {
    constructor(root) {
        this.root = root;
    }
    insert(newNode, root = this.root) {
        if (root.value > newNode.value) {
            if (!root.left) root.left = newNode;
            else this.insert(newNode, root.left);
        } else if (root.value < newNode.value) {
            if (!root.right) root.right = newNode;
            else this.insert(newNode, root.right);
        }
    }
    preorder(root = this.root) {
        if (root === null) return [];
        let ret = [root.id];

        if (root.left !== null) {
            ret = ret.concat(this.preorder(root.left));
        }
        if (root.right !== null) {
            ret = ret.concat(this.preorder(root.right));
        }
        return ret;
    }
    postorder(root = this.root) {
        if (root === null) return [];
        let ret = [];
        if (root.left) ret = ret.concat(this.postorder(root.left));
        if (root.right) ret = ret.concat(this.postorder(root.right));
        ret.push(root.id);
        return ret;
    }
}
function solution(nodeinfo) {
    // 일단 y,x 좌표가 주어질 때, 이진트리를 구성한 뒤에
    // 주어진 nodeinfo를
    // y에 따라 오름차순
    // x에 따라 오름차순을 하게 되면
    nodeinfo = nodeinfo
        .map(([x, y], i) => [x, y, i + 1])
        .sort((a, b) => b[1] - a[1]);

    const tree = new Tree(new Node(nodeinfo[0][0], nodeinfo[0][2]));
    for (let i = 1, len = nodeinfo.length; i < len; i++) {
        tree.insert(new Node(nodeinfo[i][0], nodeinfo[i][2]));
    }
    console.log(tree);
    // 전위 순회
    console.log(tree.preorder());
    console.log(tree.postorder());
    // 후위 순회

    // 각각 실시 후 결과를 리턴한다.
}

solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
]);
