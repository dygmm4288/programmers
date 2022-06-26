function solution(n, s, a, b, fares) {
    const N = n + 1;
    const adj = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => Infinity),
    );

    fares.forEach(([c, d, f]) => {
        adj[c][d] = adj[d][c] = f;
    });

    for (let i = 1; i < N; i++) adj[i][i] = 0;

    // Floyd 모든 쌍 최단 거리 알고리즘
    for (let k = 1; k < N; k++) {
        for (let i = 1; i < N; i++) {
            if (adj[i][k] === Infinity) continue;
            for (let j = 1; j < N; j++) {
                adj[i][j] = Math.min(adj[i][j], adj[i][k] + adj[k][j]);
            }
        }
    }

    let ret = adj[s][a] + adj[s][b];

    for (let i = 1; i < N; i++) {
        if (i !== s && ret > adj[s][i])
            ret = Math.min(ret, adj[s][i] + adj[i][a] + adj[i][b]);
    }
    return ret;
}

/* 
    정답코드
    function solution(n, s, a, b, fares) {
    const N = n + 1;
    const adj = Array.from({length:N},() => Array.from({length:N},() => Infinity));
    fares.forEach(([c,d,f])=> {
        adj[c][d] = f;
        adj[d][c] = f;
    });
    
    for(let i = 1;i<N;i++) adj[i][i] = 0;
    
    for(let k = 1;k<N;k++) {
        for(let i = 1;i<N;i++) {
            if(adj[i][k] === Infinity) continue;
            for(let j = 1;j<N;j++) {
                adj[i][j] = Math.min(adj[i][j], adj[i][k] + adj[k][j]);
            }
        }
    }
    
    let ret = adj[s][a] + adj[s][b];
    
    for(let i = 1;i<N;i++) {
        if(i !== s && ret > adj[s][i]) {
            ret = Math.min(ret, adj[s][i] + adj[i][a] + adj[i][b]);
        }
    }
    
    return ret;
}

*/
