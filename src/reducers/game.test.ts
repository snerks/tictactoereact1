import game from './game';
import {
    GameState,
    initialState,
    BLANK_SYMBOL,
    PLAYER_ONE_SYMBOL,
    PLAYER_TWO_SYMBOL
} from './game';

describe('Game Reducer', () => {

    it('returns initial state when supplied state is undefined', () => {
        const result = game(undefined);
        expect(result).toBe(initialState);
    });

    it('toggles current player symbol when supplied action is TAKE_TURN', () => {
        const currentState: GameState = {
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

        const result = game(currentState, { type: 'TAKE_TURN' });

        expect(result.currentTurnSymbol).toBe(PLAYER_TWO_SYMBOL);
    });

});
