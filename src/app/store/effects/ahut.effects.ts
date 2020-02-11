import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import {
    ACT_LOGIN,
    ACT_LOGOUT,
    ACT_LOGIN_SUCCESS,
    ACT_LOGIN_ERROR,
    ACT_AUTHENTICATE_SESSION
} from '../actions/actionTypes'
import { actionLoginSuccess, actionLoginError } from '../actions/auth.actions'
import { of } from 'rxjs'
import { AuthService } from '../../providers/auth/auth.service'
import { tap, map, exhaustMap, catchError, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


/*
    when the an action of some kind is dispatched, 
    thoses effects are activateds, receive the actions props and 
    call the services and dispatch another actions
    or functions if is required
*/

@Injectable()
export class AuthEffects {
    constructor(private authService: AuthService, private action$: Actions, private router: Router) { }

    login$ = createEffect(() =>
        this.action$.pipe(
            ofType(ACT_LOGIN),
            exhaustMap(action => {
                return this.authService.login(action['username'], action['password']).pipe(
                    map((token) => actionLoginSuccess({ token })),
                    catchError((error: any) => of(actionLoginError({ error })))
                )
            })
        )
    )

    loginSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(ACT_LOGIN_SUCCESS),
            concatMap(action => of(action).pipe()), tap((action) => {
                this.router.navigateByUrl('/home')
            })
        ),
        { dispatch: false }
    )

    loginError$ = createEffect(() =>
        this.action$.pipe(
            ofType(ACT_LOGIN_ERROR),
            concatMap(error => of(error).pipe()), tap((error) => {
                Swal.close();
                console.log(error)
            })
        ),
        { dispatch: false }
    )

    actionAuthenticateSession$ = createEffect(() =>
        this.action$.pipe(
            ofType(ACT_AUTHENTICATE_SESSION),
            concatMap(action => of(action).pipe()), tap((action) => {
                if (this.authService.authenticateSession()) {
                    this.router.navigateByUrl('/home')
                }
            })
        ),
        { dispatch: false }
    )

    logout$ = createEffect(() =>
        this.action$.pipe(
            ofType(ACT_LOGOUT),
            concatMap(action => of(action).pipe()), tap((action) => {
                this.authService.logout()
                this.router.navigateByUrl("/login")
            })
        ),
        { dispatch: false }
    )

}