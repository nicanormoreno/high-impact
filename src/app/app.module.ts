import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//http request
import {HttpClientModule} from '@angular/common/http'
//forms
import{FormsModule, ReactiveFormsModule} from '@angular/forms'
//componenets from materialUI
import {MaterialModule} from './material.module'
//redux
import{StoreModule} from "@ngrx/store"
import {AppReducer} from './store/app.reducer'
import {EffectsModule} from '@ngrx/effects'
import {effectsArray} from './store/effects'
//maps
import {AgmCoreModule} from '@agm/core'
//screens
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot(effectsArray),
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyD_xCIOixV5boC55wuWBURRrVpO8vbAKrY"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
