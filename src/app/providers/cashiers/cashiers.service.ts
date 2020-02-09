import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from '../Settings';
import { map } from 'rxjs/operators'
import Swal from 'sweetalert2';

const token = localStorage.getItem('token')
const _defaultHeaders = new HttpHeaders({
  "Content-Type": "application/json",
  "Authorization":`Bearer ${token}`
})
@Injectable({
  providedIn: 'root'
})
export class CashiersService {

  constructor(private http: HttpClient) {
  }

  getCashiers() {
   // let endpoint = `${SERVER_URL}/atm`
    let endpoint = 'https://www.dropbox.com/s/6fg0k2wxwrheyqk/ATMs?dl=1'
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false
    });
    Swal.showLoading();
    return this.http.get(
      endpoint, { headers: _defaultHeaders }
    ).pipe(
      map(response => {
        Swal.close();
        return response
      })
    )
  }
}
