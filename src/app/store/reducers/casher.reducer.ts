import { createReducer, Action, on } from '@ngrx/store'
import {
    actionGetCashersSuccess,
} from '../actions/cashier.actions'

export interface cashierState {
    atmsList: any[];
    error:any
}

const cashier: cashierState = {
    atmsList: [],
    error: null
}

const cashierReducer = createReducer(
    cashier,
    on(actionGetCashersSuccess, (state, { atmsList }) => ({
        ...state,
        atmsList: atmsList
    }))
)

export function CashierReducer(state: cashierState | undefined, action:Action){
    return cashierReducer(state, action)
}