import { createReducer, Action, on } from '@ngrx/store'
import {
    actionLoginSuccess,
} from '../actions/auth.actions'

export interface authState {
    token: string;
}

const auth: authState = {
    token: null
}

const authReducer = createReducer(
    auth,
    on(actionLoginSuccess, (state, { token }) => ({
        ...state,
        token: token
    }))
)

export function AuthReducer(state: authState | undefined, action:Action){
    return authReducer(state, action)
}