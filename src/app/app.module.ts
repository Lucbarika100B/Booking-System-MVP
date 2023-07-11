import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddClientsComponent } from './components/add-client/add-client.component';
import { AddReservationsComponent } from './components/reservations/add-reservation/add-reservations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { environment } from 'src/environment/environment';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { ClientsDetailsComponent } from './components/clients-details/clients-details.component';
import { ReservationsDetailsComponent } from './components/reservations/reservations-details/reservations-details.component';
import { AddSpectacleComponent } from './components/add-spectacle/add-spectacle.component';
import { ListSpectaclesComponent } from './components/list-spectacles/list-spectacles.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DialogComponent } from './dialog/dialog.component'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { UpdateUserComponent } from './components/update-user/update-user.component';


@NgModule({
  declarations: [
    AppComponent,
    AddClientsComponent,
    AddReservationsComponent,
    ListClientsComponent,
    ClientsDetailsComponent,
    ReservationsDetailsComponent,
    AddSpectacleComponent,
    ListSpectaclesComponent,
    HomePageComponent,
    DialogComponent,
    UpdateUserComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
