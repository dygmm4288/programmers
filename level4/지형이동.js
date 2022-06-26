/* 

class DisjointSet {
    constructor(n) {
        this.roots = Array.from({ length: n }, (_, i) => i);
    }
    find(a) {
        if (a === this.roots[a]) return a;
        return (this.roots[a] = this.find(this.roots[a]));
    }
    union(a, b) {
        a = this.find(a);
        b = this.find(b);
        if (a === b) return;
        this.roots[a] = b;
    }
}
function solution(land, height) {
    const len = land.length;
    let visited = Array.from({length:len},
                               () => Array.from({length:len},() => 0));
    let area = 1;
    for(let y = 0;y<len;y++) {
        for(let x = 0;x<len;x++) {

            if(visited[y][x] === 0) {
                visited[y][x] = area;
                dfs(y,x,area,height,visited,land);
                area++;
            }
        }
    }
    
    
    const edges = makeEdges(visited,land).sort((a,b) => a[2] - b[2]);
    
    const sets = new DisjointSet(len+1);
    let ret = 0;
    
    edges.forEach(([a,b,c]) => {
        const rootA = sets.find(a);
        const rootB = sets.find(b);
        if(rootA !== rootB) {
            ret += c;
            sets.union(a,b);
        }
    });
    
    return ret;
}
function makeEdges(visited,land) {
    const dy = [-1,0,1,0];
    const dx = [0,1,0,-1];
    const len = land.length;
    const graph = Array.from({length:len+1},() => 
                             Array.from({length:len+1},() => Infinity)
                            );
    
    const isntRange = (y,x) => y < 0 || y>=len || x < 0 || x>= len;
    
    for(let y = 0;y<len;y++) {
        for(let x = 0;x<len;x++) {
            for(let i = 0;i<4;i++) {
                const nextY = y + dy[i];
                const nextX = x + dx[i];
                if(!isntRange(nextY,nextX)) {
                       if(visited[y][x] !== visited[nextY][nextX]) {
                        const a = visited[y][x];
                        const b = visited[nextY][nextX];
                        const absDiff = Math.abs(land[y][x] - land[nextY][nextX]);
                        graph[a][b] = graph[b][a] = Math.min(graph[a][b],absDiff);
                    }
                }
            }
        }
    }
    const edges = [];
    for(let a = 1;a<=len;a++) {
        for(let b = a;b<=len;b++) {
            if(graph[a][b] !== Infinity) edges.push([a,b,graph[a][b]]);
        }
    }
    return edges;
}
function dfs(y,x,set,height,visited,land) {
    const dy = [-1,0,1,0];
    const dx = [0,1,0,-1];
    const len = land.length;
    const isntRange = (y,x) => y < 0 || y >= len || x < 0 || x>=len;
    
    for(let i = 0;i<4;i++) {
        const nextY = y + dy[i];
        const nextX = x + dx[i];
        if(!isntRange(nextY,nextX)) {
               if(visited[nextY][nextX] === 0 &&
                   Math.abs(land[y][x] - land[nextY][nextX]) <= height ) {
                    visited[nextY][nextX] = set;
                    dfs(nextY,nextX,set,height,visited,land);
            }
        }
    }
    return;
}


*/

function solution(land, height) {
    let area = 0;
    const n = land.length;
    const visited = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => 0),
    );

    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            if (visited[y][x] === 0) {
                visited[y][x] = area;
                dfs(y, x, area, height, visited, land);
                area++;
            }
        }
    }
    console.table(visited);
}
function dfs(y, x, set, height, visited, land) {
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    const len = land.length;
    const isntRange = (y, x) => y < 0 || y >= len || x < 0 || x >= len;

    for (let i = 0; i < 4; i++) {
        const nextY = y + dy[i];
        const nextX = x + dx[i];
        if (!isntRange(nextY, nextX)) {
            if (
                visited[nextY][nextX] === 0 &&
                Math.abs(land[y][x] - land[nextY][nextX]) <= height
            ) {
                visited[nextY][nextX] = set;
                dfs(nextY, nextX, set, height, visited, land);
            }
        }
    }
    return;
}

solution([
    [1, 4, 8, 10],
    [5, 5, 5, 5],
    [10, 10, 10, 10],
    [10, 10, 10, 20],
]);
