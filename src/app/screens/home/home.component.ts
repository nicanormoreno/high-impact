import { Component, OnInit } from '@angular/core';
import { AtmModel } from '../../models/atm.model'
import { Store } from '@ngrx/store'
import { appState } from '../../store/app.reducer'
import { actionGetAllCashers, actionSearchCasiers } from '../../store/actions/cashier.actions'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lat: number;
  lng: number
  atmsList: AtmModel[]
  searchForm: FormGroup

  constructor(private store: Store<appState>) {
    navigator.geolocation.getCurrentPosition(response=>{
      this.lat = response.coords.latitude;
      this.lng = response.coords.longitude
    })

    this.store.select('cashier').subscribe(rta => {
      this.atmsList = rta.atmsList
    })
    this.store.dispatch(
      actionGetAllCashers()
    )

    this.searchForm = new FormGroup({
      label: new FormControl('' ),
      address: new FormControl(''),
      city: new FormControl(''),
      housenumber: new FormControl(''),
      postalcode: new FormControl(''),
      lat: new FormControl(''),
      lng: new FormControl(''),
      type: new FormControl('')
    })
  }

  /*
    Desplegate a popUp with the ATM info
  */
  atmDetail(atm: AtmModel) {
    Swal.fire({
      // title:"<strong>ATM</strong>",
      imageUrl: "https://www.jetco.com.hk/images/icons/Icon-atms.png",
      imageHeight: 100,
      html: `
      <div style="align-items:flex-start; font-size:25px" class="card">
        <div style='align-self:flex-start; margin-left:15px; margin-top:15px'>
        <strong>SRTEET:</strong> ${atm.address.street} ${atm.address.housenumber}
        </div>
        <div style='align-self:flex-start; margin-left:15px; margin-top:15px'>
        <strong>CITY:</strong> ${atm.address.city}
        </div>
        <div style='align-self:flex-start; margin-left:15px; margin-top:15px'>
          <strong>POSTAL CODE:</strong> ${atm.address.postalcode}
        </div>
        <div style='align-self:flex-start; margin-left:15px; margin-top:15px; margin-bottom: 15px'>
          <strong>TYPE:</strong> ${atm.type}
        </div>
      </div>
      `,
      allowOutsideClick: true
    })
  }


  search(){
    let value = this.searchForm.value
   
    let search:string = `q=${value.label}&fields=`
    if(value.street) search = search+'street,'
    if(value.housenumber) search = search+'housenumber,'
    if(value.postalcode) search = search+'postalcode,'
    if(value.city) search = search+'city,'
    if(value.lat) search = search+'lat,'
    if(value.lng) search = search+'lng,'
    if(value.type) search = search+'type,'
    
    search = search.substring(0, search.length - 1);
    this.store.dispatch(
      actionSearchCasiers({search})
    )
    this.store.select('cashier').subscribe(rta=>{
      this.atmsList = rta.atmsList
    })
  }

  ngOnInit(): void {
  }

}
