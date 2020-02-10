import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store'
import { appState } from '../../store/app.reducer'
import { actionLogout } from '../../store/actions/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<appState>) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(actionLogout())
  }

}
