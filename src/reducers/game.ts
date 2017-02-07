import { Action } from 'redux';

const defaultAction: Action = { type: '' };

export interface GameState {
    playerOneSymbol: string;
    playerTwoSymbol: string;
    currentTurnSymbol: string;
    board: string[];
    winner: string | null;
}

const BLANK_SYMBOL = '?';
const PLAYER_ONE_SYMBOL = 'Y';
const PLAYER_TWO_SYMBOL = 'N';
// const DRAW_SYMBOL = 'Nobody';

const initialState: GameState = {
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

    return state;
}