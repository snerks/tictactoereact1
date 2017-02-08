import { Action } from 'redux';

interface ReduxAction<T> extends Action {
    payload?: T;
}

export interface GameState {
    playerOneSymbol: string;
    playerTwoSymbol: string;
    currentTurnSymbol: string;
    board: string[];
    winner: string | null;
}

export const BLANK_SYMBOL = '?';
export const PLAYER_ONE_SYMBOL = 'Y';
export const PLAYER_TWO_SYMBOL = 'N';
export const DRAW_SYMBOL = 'Nobody';

export const initialState: GameState = {
    playerOneSymbol: PLAYER_ONE_SYMBOL,
    playerTwoSymbol: PLAYER_TWO_SYMBOL,
    currentTurnSymbol: PLAYER_ONE_SYMBOL,
    board: [
        BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
        BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
        BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
    ],
    winner: null,
};

interface TakeTurnActionPayload {
    index: number;
}

export interface TakeTurnAction extends ReduxAction<TakeTurnActionPayload> {

}

interface OtherAction extends ReduxAction<{}> {

}

const defaultAction: OtherAction = { type: '' };

// type GameAction = TakeTurnAction | OtherAction;

const winningCombosIndices = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkForWinner(board: string[], currentTurnSymbol: string): string | null {
    const foundWinningComboIndices = winningCombosIndices.find((winningComboIndices: number[]) => {
        const firstBoardCellSymbol = board[winningComboIndices[0]];
        const secondBoardCellSymbol = board[winningComboIndices[1]];
        const thirdBoardCellSymbol = board[winningComboIndices[2]];

        return (
            firstBoardCellSymbol !== BLANK_SYMBOL &&
            firstBoardCellSymbol === secondBoardCellSymbol &&
            firstBoardCellSymbol === thirdBoardCellSymbol);
    });

    if (foundWinningComboIndices) {
        return currentTurnSymbol;
    }

    const blankSymbolCells = board.filter(
        (cellSymbol: string) => cellSymbol === BLANK_SYMBOL
    );

    return blankSymbolCells.length === 0 ? DRAW_SYMBOL : null;
}

export default function game(
    state: GameState = initialState,
    action: Action = defaultAction): GameState {

    switch (action.type) {
        case 'TAKE_TURN':
            const newState = { ...state };

            const index = ((action as TakeTurnAction).payload) !.index;

            if (newState.board[index] === BLANK_SYMBOL) {
                newState.board[index] = state.currentTurnSymbol;
            }

            newState.winner = checkForWinner(newState.board, state.currentTurnSymbol);

            newState.currentTurnSymbol = (
                state.currentTurnSymbol === state.playerOneSymbol ?
                    state.playerTwoSymbol :
                    state.playerOneSymbol
            );

            return newState;
        default:
            return state;
    }
}
