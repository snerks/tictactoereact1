import { ReduxAction } from './reduxAction';

export function reset(): ReduxAction {
    return {
        type: 'RESET'
    };
}

export function takeTurn(index: number): ReduxAction {
    return {
        type: 'TAKE_TURN',
        payload: {
            index
        }
    };
}