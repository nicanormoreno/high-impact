import { Component, OnInit } from '@angular/core';
import { AtmModel } from '../../models/atm.model'
import { Store } from '@ngrx/store'
import { appState } from '../../store/app.reducer'
import { actionGetAllCashers, actionSearchCasiers } from '../../store/actions/cashier.actions'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lat: number = 52.010421;
  lng: number = 5.431647;
  zoom: number = 10;
  atmsList: AtmModel[];
  error = null;
  searchForm: FormGroup

  constructor(private store: Store<appState>) {
    navigator.geolocation.getCurrentPosition(response => {
      this.lat = response.coords.latitude;
      this.lng = response.coords.longitude;
    })

    this.store.select('cashier').subscribe(rta => {
      this.atmsList = rta.atmsList;
      this.error = rta.error;
    })
    this.store.dispatch(
      actionGetAllCashers()
    )

    this.searchForm = new FormGroup({
      label: new FormControl(''),
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


  search() {

    let value = this.searchForm.value
    let search = value.label;
    /*
      generate a string with the fields to search
    */
    let fields: string = ''
    if (value.street) fields = fields + 'street,'
    if (value.housenumber) fields = fields + 'housenumber,'
    if (value.postalcode) fields = fields + 'postalcode,'
    if (value.city) fields = fields + 'city,'
    if (value.lat) fields = fields + 'lat,'
    if (value.lng) fields = fields + 'lng,'
    if (value.type) fields = fields + 'type,'

    fields = fields.substring(0, fields.length - 1);
    this.store.dispatch(
      actionSearchCasiers({ search, fields })
    )
    this.store.select('cashier').subscribe(rta => {
      this.atmsList = rta.atmsList
      console.log(this.lat, this.lng)
      /* 
        if some value cames has a string this convert it to numeric value 
      */
      let lat: string = this.atmsList[0].address.geoLocation.lat.toString()
      let lng: string = this.atmsList[0].address.geoLocation.lng.toString()
      this.lat = Number.parseFloat(lat)
      this.lng = Number.parseFloat(lng)
      this.zoom = 12
    })
  }

  ngOnInit(): void {
  }

}
