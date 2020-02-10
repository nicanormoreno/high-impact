import {
    ACT_GET_ALL_CASHIERS,
    ACT_GET_ALL_CASHIERS_SUCCESS,
    ACT_GET_ALL_CASHIERS_ERROR
} from './actionTypes'
import { createAction, props } from '@ngrx/store'

export const actionGetAllCashers = createAction(
    ACT_GET_ALL_CASHIERS,
)

export const actionGetAllCashersSuccess = createAction(
    ACT_GET_ALL_CASHIERS_SUCCESS,
    props<{ atmsList: any }>()
)

export const actionGetAllCashersError = createAction(
    ACT_GET_ALL_CASHIERS_ERROR,
    props<{ error: any }>()
)