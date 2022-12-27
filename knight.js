export const Knight = () => {

    // coords = [X axis, Y Axis]

    let symbol = 'k';

    let pos = [];

    const getSymbol = () => {
        return symbol;
    }

    const getPos = () => {
        return pos;
    }

    const move = (coords) => {
        pos = [...coords];
        game.set([coords[1],coords[0]],'k');
        return pos;
    }

    const isValid = (coords) => {
        return (coords[0]>=0 && coords[0]<=7) && (coords[1]>=0 && coords[1]<=7)
    }

    const availableMoves = (coords = getPos()) => {

        let moves = [];

        let avMoves = [
            [-2,-1],
            [-2,1],
            [-1,-2],
            [-1,2],
            [1,-2],
            [1,2],
            [2,-1],
            [2,1]
        ];

        for(let test of avMoves){
            let move = coords.map((c,i) => coords[i] + test[i]);
            if(isValid(move)) moves.push(move);
        }

        return moves
    }

    return {
        getSymbol,
        getPos,
        move,
        availableMoves,
    }
}