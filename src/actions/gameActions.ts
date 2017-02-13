import { ReduxAction } from './reduxAction';

export const ResetActionTypeName = 'App/RESET';
export const TakeTurnActionTypeName = 'App/TAKE_TURN';

export function reset(): ReduxAction {
    return {
        type: ResetActionTypeName
    };
}

export function takeTurn(index: number): ReduxAction {
    return {
        type: TakeTurnActionTypeName,
        payload: {
            index
        }
    };
}