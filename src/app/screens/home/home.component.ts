import { Component, OnInit } from '@angular/core';
import { CashiersService } from '../../providers/cashiers/cashiers.service';
import {Store} from '@ngrx/store'
import {appState} from '../../store/app.reducer'
import {actionGetAllCashers} from '../../store/actions/cashier.actions'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<appState>) {
    this.store.dispatch(
      actionGetAllCashers()
    )
   }

  ngOnInit(): void {
  }

}
