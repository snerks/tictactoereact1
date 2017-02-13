import { Action } from 'redux';
import { TakeTurnActionTypeName, ResetActionTypeName } from '../actions/gameActions';

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
export const PLAYER_ONE_SYMBOL = 'O';
export const PLAYER_TWO_SYMBOL = 'X';
export const DRAW_SYMBOL = 'Nobody';

export const initialGameState: GameState = {
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

export interface TakeTurnAction extends ReduxAction<TakeTurnActionPayload> { }
export interface ResetAction extends ReduxAction<{}> { };
interface OtherAction extends ReduxAction<{}> { }

const defaultAction: OtherAction = { type: '' };

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

type GameAction = TakeTurnAction | ResetAction | OtherAction;

export default function game(
    state: GameState = initialGameState,
    action: GameAction = defaultAction): GameState {

    switch (action.type) {
        case ResetActionTypeName:
            return initialGameState;

        case TakeTurnActionTypeName:

            if (state.winner) {
                return state;
            }

            const newBoardState: string[] = state.board.slice(0);
            const newState: GameState = { ...state, board: newBoardState };

            const index = ((action as TakeTurnAction).payload) !.index;

            if (newState.board[index] === BLANK_SYMBOL) {
                newState.board[index] = state.currentTurnSymbol;

                newState.currentTurnSymbol = (
                    state.currentTurnSymbol === state.playerOneSymbol ?
                        state.playerTwoSymbol :
                        state.playerOneSymbol
                );
            }

            newState.winner = checkForWinner(newState.board, state.currentTurnSymbol);

            return newState;
        default:
            return state;
    }
}
