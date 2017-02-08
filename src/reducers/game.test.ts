import game from './game';
import {
    GameState,
    initialState,
    BLANK_SYMBOL,
    PLAYER_ONE_SYMBOL,
    PLAYER_TWO_SYMBOL,
    DRAW_SYMBOL,
    TakeTurnAction
} from './game';

describe('Game Reducer', () => {

    it('returns initial state when supplied state is undefined', () => {
        const result = game(undefined);
        expect(result).toEqual(initialState);
    });

    it('returns supplied state when supplied action is not handled', () => {
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

        const result = game(currentState, { type: 'NOT_HANDLED' });

        expect(result).toEqual(currentState);
    });

    describe('TAKE_TURN Action', () => {
        it('when selected cell is blank toggles current player symbol', () => {
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

            const takeTurnAction: TakeTurnAction = {
                type: 'TAKE_TURN',
                payload: { index: 0 }
            };

            const result = game(currentState, takeTurnAction);

            expect(result.currentTurnSymbol).toBe(PLAYER_TWO_SYMBOL);
        });

        it('when selected cell is not blank does not toggle current player symbol', () => {
            const currentState: GameState = {
                playerOneSymbol: PLAYER_ONE_SYMBOL,
                playerTwoSymbol: PLAYER_TWO_SYMBOL,
                currentTurnSymbol: PLAYER_ONE_SYMBOL,
                board: [
                    PLAYER_ONE_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                    BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                    BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                ],
                winner: null,
            };

            const takeTurnAction: TakeTurnAction = {
                type: 'TAKE_TURN',
                payload: { index: 0 }
            };

            const result = game(currentState, takeTurnAction);

            expect(result.currentTurnSymbol).toBe(PLAYER_ONE_SYMBOL);
        });

        it('when winner is not null does not change current cell symbol', () => {
            const currentState: GameState = {
                playerOneSymbol: PLAYER_ONE_SYMBOL,
                playerTwoSymbol: PLAYER_TWO_SYMBOL,
                currentTurnSymbol: PLAYER_ONE_SYMBOL,
                board: [
                    BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                    PLAYER_ONE_SYMBOL, PLAYER_ONE_SYMBOL, PLAYER_ONE_SYMBOL,
                    BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                ],
                winner: PLAYER_ONE_SYMBOL,
            };

            const expectedIndex = 0;

            const takeTurnAction: TakeTurnAction = {
                type: 'TAKE_TURN',
                payload: { index: expectedIndex }
            };

            const result = game(currentState, takeTurnAction);

            expect(result.board[expectedIndex]).toBe(BLANK_SYMBOL);
        });

        it('when selected board cell is blank sets correct board cell with current player symbol', () => {
            const expectedCurrentTurnSymbol = PLAYER_ONE_SYMBOL;

            const currentState: GameState = {
                playerOneSymbol: PLAYER_ONE_SYMBOL,
                playerTwoSymbol: PLAYER_TWO_SYMBOL,
                currentTurnSymbol: expectedCurrentTurnSymbol,
                board: [
                    BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                    BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                    BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                ],
                winner: null,
            };

            const expectedIndex = 0;

            const takeTurnAction: TakeTurnAction = {
                type: 'TAKE_TURN',
                payload: { index: expectedIndex }
            };

            const result = game(currentState, takeTurnAction);

            expect(result.board[expectedIndex]).toBe(expectedCurrentTurnSymbol);
        });

        it('when selected board cell is not blank does not change board cell', () => {
            const expectedCurrentTurnSymbol = PLAYER_ONE_SYMBOL;
            const expectedSelectedBoardCellSymbol = PLAYER_TWO_SYMBOL;

            const currentState: GameState = {
                playerOneSymbol: PLAYER_ONE_SYMBOL,
                playerTwoSymbol: PLAYER_TWO_SYMBOL,
                currentTurnSymbol: expectedCurrentTurnSymbol,
                board: [
                    expectedSelectedBoardCellSymbol, BLANK_SYMBOL, BLANK_SYMBOL,
                    BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                    BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                ],
                winner: null,
            };

            const expectedIndex = 0;

            const takeTurnAction: TakeTurnAction = {
                type: 'TAKE_TURN',
                payload: { index: expectedIndex }
            };

            const result = game(currentState, takeTurnAction);

            expect(result.board[expectedIndex]).toBe(expectedSelectedBoardCellSymbol);
        });

        it('when all board cells are non-blank with no winner sets winner to DRAW_SYMBOL', () => {
            const currentState: GameState = {
                playerOneSymbol: PLAYER_ONE_SYMBOL,
                playerTwoSymbol: PLAYER_TWO_SYMBOL,
                currentTurnSymbol: PLAYER_ONE_SYMBOL,
                board: [
                    PLAYER_ONE_SYMBOL, PLAYER_ONE_SYMBOL, PLAYER_TWO_SYMBOL,
                    PLAYER_TWO_SYMBOL, PLAYER_TWO_SYMBOL, PLAYER_ONE_SYMBOL,
                    PLAYER_ONE_SYMBOL, PLAYER_TWO_SYMBOL, PLAYER_ONE_SYMBOL,
                ],
                winner: null,
            };

            const takeTurnAction: TakeTurnAction = {
                type: 'TAKE_TURN',
                payload: { index: 0 }
            };

            const result = game(currentState, takeTurnAction);

            expect(result.winner).toBe(DRAW_SYMBOL);
        });

        it('when selected board cell index creates a winning combo sets winner to winning symbol', () => {
            const expectedCurrentTurnSymbol = PLAYER_ONE_SYMBOL;

            const currentState: GameState = {
                playerOneSymbol: PLAYER_ONE_SYMBOL,
                playerTwoSymbol: PLAYER_TWO_SYMBOL,
                currentTurnSymbol: PLAYER_ONE_SYMBOL,
                board: [
                    BLANK_SYMBOL, PLAYER_ONE_SYMBOL, PLAYER_ONE_SYMBOL,
                    PLAYER_TWO_SYMBOL, PLAYER_TWO_SYMBOL, PLAYER_ONE_SYMBOL,
                    PLAYER_ONE_SYMBOL, PLAYER_TWO_SYMBOL, PLAYER_TWO_SYMBOL,
                ],
                winner: null,
            };

            const takeTurnAction: TakeTurnAction = {
                type: 'TAKE_TURN',
                payload: { index: 0 }
            };

            const result = game(currentState, takeTurnAction);

            expect(result.winner).toBe(expectedCurrentTurnSymbol);
        });
    });

    describe('RESET Action', () => {
        it('resets state to initial state', () => {
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

            const currentState: GameState = {
                playerOneSymbol: PLAYER_ONE_SYMBOL,
                playerTwoSymbol: PLAYER_TWO_SYMBOL,
                currentTurnSymbol: PLAYER_ONE_SYMBOL,
                board: [
                    PLAYER_ONE_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                    BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                    BLANK_SYMBOL, BLANK_SYMBOL, BLANK_SYMBOL,
                ],
                winner: null,
            };

            const action: TakeTurnAction = {
                type: 'RESET'
            };

            const result = game(currentState, action);

            expect(result).toEqual(initialState);
        });
    });

});
