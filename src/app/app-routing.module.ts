import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const screens=[
  HomeComponent,
  LoginComponent
]
