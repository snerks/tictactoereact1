import { Action } from 'redux';

const defaultAction: Action = { type: '' };

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
// export const DRAW_SYMBOL = 'Nobody';

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

export default function game(
    state: GameState = initialState,
    action: Action = defaultAction): GameState {

    switch (action.type) {
        case 'TAKE_TURN':
            const newCurrentTurnSymbol = (
                state.currentTurnSymbol === state.playerOneSymbol ?
                    state.playerTwoSymbol :
                    state.playerOneSymbol
            );

            const newState = { ...state, ...{ currentTurnSymbol: newCurrentTurnSymbol } };

            return newState;
        default:
            return state;
    }
}