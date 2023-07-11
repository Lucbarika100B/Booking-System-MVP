import { Injectable } from '@angular/core';
import { Reservations } from 'src/models/reservation-model/reservations.model';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable,  } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  combineLatest = combineLatest;

  private resDbPath = '/reservations';

  reservationList: AngularFireList<Reservations>;

  constructor(
    private angularFireDB: AngularFireDatabase,
    private dialog: MatDialog
  ) {
    this.reservationList = angularFireDB.list(this.resDbPath);
  }

  public getReservationsByClientId(clientId: string) {
    const test= this.angularFireDB
      .list('reservation', (ref) =>
        ref.orderByChild('clientId').equalTo(clientId)
      )
      .valueChanges();
      console.log(test);
      return test ;
  }

  getClientDetails(clientId: string) {
    console.log('getClientDetails called with clientId:', clientId);
    return this.angularFireDB.object(`clients/${clientId}`).valueChanges();
  }

  getDocumentByEventId(eventId: string) {
    return this.angularFireDB
     .list('reservation', (ref) =>
       ref.orderByChild('eventId').equalTo(eventId)
     )
     .valueChanges();
  }


  public getAllReservations(): AngularFireList<Reservations> {
    return this.reservationList;
  }

  public getReservationById($key: string): Observable<Reservations> {
    return this.reservationList.valueChanges() as unknown as Observable<Reservations>;
  }

  public createReservation(reservation: Reservations): void {
    const element = this.reservationList.push(reservation);
    reservation.$key = element.key;
    this.reservationList.update(reservation.$key as string, reservation);
  }

  createItemWithAutoId(data: any): Promise<void> {
    const itemList = this.angularFireDB.list('reservation');
    return new Promise<void>((resolve, reject) => {
      itemList.push(data).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public updateReservation(key: string, value: any): Promise<void> {
    return this.reservationList.update(key, value);
  }

  public deleteReservation(key: string): Promise<void> {
    return this.reservationList.remove(key);
  }

  public deleteAllReservation(): Promise<void> {
    return this.reservationList.remove();
  }

  public showReservationDialogMessage(title: string, message: string): void {
    if (!title) {
      title = 'An error occured in the reservation! Try Again';
    }
    this.dialog.open(Error, {
      data: {
        title,
        message,
      },
    });
  }
}
