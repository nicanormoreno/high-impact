import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../providers/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = localStorage.getItem('username');
  remember_me = localStorage.getItem('remember_me') ? true : false
  forma: FormGroup;

  constructor(private service: AuthService) {
    this.forma = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl("", Validators.required),
      remember_me: new FormControl(this.remember_me),
    })
  }

  ngOnInit(): void {
    this.service.authenticateSession()
  }

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
        console.log(response)
      })
    }
  }
}
