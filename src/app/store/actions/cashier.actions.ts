import {
    ACT_GET_ALL_CASHIERS,
    ACT_SEATCH_CASIERS,
    ACT_GET_ALL_CASHIERS_SUCCESS,
    ACT_GET_ALL_CASHIERS_ERROR
} from './actionTypes'
import { createAction, props } from '@ngrx/store'

export const actionGetAllCashers = createAction(
    ACT_GET_ALL_CASHIERS,
)

export const actionGetCashersSuccess = createAction(
    ACT_GET_ALL_CASHIERS_SUCCESS,
    props<{ atmsList: any }>()
)

export const actionGetAllCashersError = createAction(
    ACT_GET_ALL_CASHIERS_ERROR,
    props<{ error: any }>()
)

export const actionSearchCasiers = createAction(
    ACT_SEATCH_CASIERS,
    props<{search:string, fields:string}>()
) 