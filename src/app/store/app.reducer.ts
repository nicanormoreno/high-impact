// import * as reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store'
import * as reducers from './reducers'

export interface appState {
    auth: reducers.authState
    cashier: reducers.cashierState
}

export const AppReducer: ActionReducerMap<appState> = {
    auth: reducers.AuthReducer,
    cashier: reducers.CashierReducer
}