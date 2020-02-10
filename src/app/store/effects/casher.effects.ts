import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import {
    ACT_GET_ALL_CASHIERS,
    ACT_GET_ALL_CASHIERS_SUCCESS,
    ACT_GET_ALL_CASHIERS_ERROR,
    ACT_SEATCH_CASIERS
} from '../actions/actionTypes'
import { CashiersService } from '../../providers/cashiers/cashiers.service'
import { of } from 'rxjs'
import { tap, map, exhaustMap, catchError, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { actionGetCashersSuccess, actionGetAllCashersError } from '../actions/cashier.actions';

@Injectable()
export class CashierEffects {
    constructor(private cashiersService: CashiersService, private action$: Actions, private router: Router) { }

    getAllCashiers$ = createEffect(() =>
        this.action$.pipe(
            ofType(ACT_GET_ALL_CASHIERS),
            exhaustMap(() => this.cashiersService.getCashiers().pipe(
                map((atmsList) => actionGetCashersSuccess({ atmsList })),
                catchError((error: any) => of(actionGetAllCashersError({ error })))
            ))
        )
    )
    getSearchCashiers$ = createEffect(() =>
    this.action$.pipe(
        ofType(ACT_SEATCH_CASIERS),
        exhaustMap((action) => this.cashiersService.searchCashiers(action['search']).pipe(
            map((atmsList) => actionGetCashersSuccess({ atmsList })),
            catchError((error: any) => of(actionGetAllCashersError({ error })))
        ))
    )
)

    getAllCashiersError$ = createEffect(() =>
        this.action$.pipe(
            ofType(ACT_GET_ALL_CASHIERS_ERROR),
            concatMap(error => of(error).pipe()), tap((error) => {
                Swal.close();
            })
        ),
        { dispatch: false }
    )
}