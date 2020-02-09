import { Component, OnInit } from '@angular/core';
import { CashiersService } from '../../providers/cashiers/cashiers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: CashiersService) {
    localStorage.clear()
    this.service.getCashiers().subscribe(response=>{
      console.log(response)
    })
   }

  ngOnInit(): void {
  }

}
