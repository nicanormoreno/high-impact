import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../providers/auth/auth.service';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store'
import {appState} from '../../store/app.reducer'
import {actionLogin, actionAuthenticateSession} from '../../store/actions/auth.actions'
import { subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = localStorage.getItem('username');
  remember_me = localStorage.getItem('remember_me') ? true : false
  error:any
  forma: FormGroup;

  constructor(private store:Store<appState>) {
    this.forma = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl("", Validators.required),
      remember_me: new FormControl(this.remember_me),
    })
  }

  ngOnInit(): void {
    this.store.dispatch(
      actionAuthenticateSession()
    )
    this.store.select('auth').subscribe(rta=>{
      if(rta.error) this.error = rta.error
    })
  }

  /*
    Call the login service when the Sign In button is pressed and redirecto to home.
    If Remember_me option is true, save un chache this option and
    the username. Else, clear the app cache
  */
  onSubmit() {
    if (this.forma.valid) {
      const { username, password, remember_me } = this.forma.value
      if (remember_me) {
        localStorage.setItem('username', username)
        localStorage.setItem('remember_me', 'true')
      } else {
        localStorage.clear()
      }
      this.store.dispatch(
        actionLogin({username, password})
      )
    }
  }
}
