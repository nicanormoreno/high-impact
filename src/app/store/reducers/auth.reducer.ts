import { createReducer, Action, on } from '@ngrx/store'
import {
    actionLoginSuccess, actionLoginError,
} from '../actions/auth.actions'

/*
    when the an action of some kind is dispatched, 
    the reducers are activated to receive 
    and save the actions props in a global local memory called store
*/
export interface authState {
    token: string;
    error: any;
}

const auth: authState = {
    token: null,
    error:null
}

const authReducer = createReducer(
    auth,
    on(actionLoginSuccess, (state, { token }) => ({
        ...state,
        token: token
    })),
    on(actionLoginError, (state, {error})=>({
        ...state,
        error:error
    }))
)

export function AuthReducer(state: authState | undefined, action:Action){
    return authReducer(state, action)
}