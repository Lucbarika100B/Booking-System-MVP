import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientsComponent } from './components/add-client/add-client.component';
import { AddReservationsComponent } from './components/reservations/add-reservation/add-reservations.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddSpectacleComponent } from './components/add-spectacle/add-spectacle.component';
import { ListSpectaclesComponent } from './components/list-spectacles/list-spectacles.component';
import { ReservationsDetailsComponent } from './components/reservations/reservations-details/reservations-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'list-client', component: ListClientsComponent },  
  { path: 'add-client', component: AddClientsComponent },
  { path: 'show-bookings/:eventId', component: ReservationsDetailsComponent },
  { path: 'add-show', component: AddSpectacleComponent },
  { path: 'list-client/:clientId', component: ListSpectaclesComponent },
  { path: 'list-client/:clientId/:eventId', component: AddReservationsComponent },
  { path: 'reservations', component: AddReservationsComponent },
  { path: 'list-show', component: ListSpectaclesComponent},
  { path: 'add-reservation', component: AddReservationsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
