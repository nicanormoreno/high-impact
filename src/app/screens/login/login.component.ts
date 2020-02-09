import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../providers/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = localStorage.getItem('username');
  remember_me = localStorage.getItem('remember_me') ? true : false
  forma: FormGroup;

  constructor(private service: AuthService, private router:Router) {
    this.forma = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl("", Validators.required),
      remember_me: new FormControl(this.remember_me),
    })
  }

  ngOnInit(): void {
    if(this.service.authenticateSession()){
      
    }
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
      this.service.login(username, password).subscribe(response => {
        this.router.navigateByUrl("/home")
      })
    }
  }
}
