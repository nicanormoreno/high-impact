import {
    ACT_LOGIN,
    ACT_LOGIN_SUCCESS,
    ACT_LOGIN_ERROR,
    ACT_AUTHENTICATE_SESSION,
    ACT_LOGOUT
} from './actionTypes'
import { createAction, props } from '@ngrx/store'

export const actionLogin = createAction(
    ACT_LOGIN,
    props<{ username: string, password: string }>()
)

export const actionLoginSuccess = createAction(
    ACT_LOGIN_SUCCESS,
    props<{ token: string }>()
)

export const actionLoginError = createAction(
    ACT_LOGIN_ERROR,
    props<{ error: any }>()
)

export const actionAuthenticateSession = createAction(
    ACT_AUTHENTICATE_SESSION,
)

export const actionLogout = createAction(
    ACT_LOGOUT
)