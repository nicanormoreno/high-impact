import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthService } from '../providers/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private service:AuthService){}

  canActivate():boolean {
    console.log(this.service.authenticateSession())
    if(this.service.authenticateSession()){
      return true
    }
    this.router.navigateByUrl("/login")
    return false
  }
  
}
