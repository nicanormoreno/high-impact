import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from '../Settings';
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { appState } from '../../store/app.reducer'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CashiersService {
  _defaultHeaders: HttpHeaders

  constructor(private http: HttpClient, private store: Store<appState>) {
    this.store.select('auth').subscribe(rta => {
      this._defaultHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: rta.token ? rta.token : localStorage.getItem('token')
      })
    })
  }

  getCashiers() {
    let endpoint = `${SERVER_URL}/atms?q=Kaaikhof`

    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false
    });
    Swal.showLoading();
    return this.http.get(
      endpoint, { headers: this._defaultHeaders }
    ).pipe(
      map(response => {
        Swal.close();
        return response
      })
    )
  }

  searchCashiers(search) {
    let endpoint = `${SERVER_URL}/atms?${search}`

    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false
    });
    Swal.showLoading();
    return this.http.get(
      endpoint, { headers: this._defaultHeaders }
    ).pipe(
      map(response => {
        Swal.close();
        return response
      })
    )
  }
}
