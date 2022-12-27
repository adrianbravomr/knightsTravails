import { Knight } from "./knight.js";

const Game = () => {

    let board = [];

    let graph = {};

    const get = () => {
        return board;
    }

    const set = (coords,val) => {
        board[coords[1]][coords[0]] = val;
        return board;
    }
    
    const build = () => {
        return [...Array(8)].map(() => [...Array(8).fill('')]);
    }

    const printMoves =  (piece) => {

        let tempBoard = build();
        let pos = piece.getPos()
        tempBoard[pos[1]][pos[0]] = piece.getSymbol();
    
        for(let move of piece.availableMoves()){
            tempBoard[move[1]][move[0]]='🔺';
        }
        console.table(tempBoard);
    }

    const getGraph = () => {
        return graph;
    }

    const hasPath = (src,dst,visited = new Set()) => {

        Array.isArray(src) ? src = `${src[0]},${src[1]}` : src;
        Array.isArray(dst) ? dst = `${dst[0]},${dst[1]}` : dst;

        if(src === dst) return true;

        if(visited.has(src)) return false;

        visited.add(src);

        for(let node of graph[src]){
            if(hasPath(node,dst,visited)) return true;          
        }

        return false;
    }

    const shortestPath = (src,dst) => {

        Array.isArray(src) ? src = `${src[0]},${src[1]}` : src;
        Array.isArray(dst) ? dst = `${dst[0]},${dst[1]}` : dst;

        let queue =[[src,[src]]];
        let visited = new Set([src]);

        while(queue.length>0){
            let [node,path] = queue.shift();

            for(let neighbor of graph[node]){  
                let current = `${neighbor[0]},${neighbor[1]}`;
                if(!visited.has(current)){
                    visited.add(current);          
                    if(current === dst) return [...path,current];
                    queue.push([current,[...path,current]]);
                }    

            }
        }
    }

    const init = (() =>{
        board = build();
        graph = {};
        for(let x=0;x<board[0].length;x++){
            for(let y=0;y<board.length;y++){
                let node = `${x},${y}`;
                graph[node] = Knight().availableMoves([x,y]);
            }
        }
    })();

    return {
        build,
        get,
        set,
        getGraph,
        hasPath,
        shortestPath,
        printMoves,
    }

}