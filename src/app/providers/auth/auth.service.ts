import { Injectable } from '@angular/core';
import { SERVER_URL } from '../Settings'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import Swal from 'sweetalert2';

const _defaultHeaders = new HttpHeaders({
  "Content-Type": "application/json",
})

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userToken: string = ""
  constructor(private http: HttpClient) { }

  /*
    resive the user token and save it in cache.
    Doesn't retun any value 
  */
  private saveToken(token: string) {
    localStorage.setItem("token", token)
  }

  /*
    take the value of the token from the cache and use to validate if is session open.
    Return a Boolean value
  */
  authenticateSession() {
    return localStorage.getItem('token') ? true : false
  }

  /*
    resive user credentials and
    Return the session token as plane text
  */
  login(username: string, password: string) {
    let endpoint = `${SERVER_URL}/login`

    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
    })
    Swal.showLoading();
    return this.http.post(
      endpoint,
      {
        username: username,
        password: password
      },
      {
        responseType: 'text',
        headers: _defaultHeaders
      }
    ).pipe(
      map((response: string) => {
        Swal.close()
        if (response) this.saveToken(response)
        return response
      })
    )
  }

  /*
    delete all the parameter of the cache to close te session.
    Doesn't retun any value
  */
  logout() {
    localStorage.clear()
  }
}
