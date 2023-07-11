import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Reservations } from 'src/models/reservation-model/reservations.model';
import { ReservationsService } from 'src/app/services/reservations-service/reservations.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { SpectaclesService } from 'src/app/services/spectacles-service/spectacles.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients-services/clients.service';



@Component({
  selector: 'app-reservations',
  templateUrl: './add-reservations.component.html',
  styleUrls: ['./add-reservations.component.css'],
})
export class AddReservationsComponent implements OnInit, OnDestroy {
  form: FormGroup | undefined;
  public isConfirmed = false;
  public eventId :  any;
  clientId: any;
  event: any;
  client : any;
  calcRegular: number = 0 ;
  calcStudent: number = 0 ;


  public mode = 'createReservation';
    reservation = new Reservations();
    reservationForm = new FormGroup({
    regularTickets: new FormControl(''),
    studentTickets: new FormControl(''),
    category : new FormControl('')
  });
  @ViewChild('secondDialog', { static: true })
  secondDialog!: TemplateRef<any>;
  

  constructor(
    private spectacleService: SpectaclesService,
    private clientService : ClientsService,
    private router: Router,
    private route: ActivatedRoute,
    private addReservation : ReservationsService,
    private dialog: MatDialog

  ) {}


  
  public onSubmit(): void {
    const paramIds = { clientId: this.clientId, eventId: this.eventId};
    const regularTicketVal = this.reservationForm.value.regularTickets;
    const studentTicketVal = this.reservationForm.value.studentTickets;
    this.calcStudent= studentTicketVal ?  +studentTicketVal * this.event.priceStudent: 0;
    this.calcRegular = regularTicketVal ?  +regularTicketVal * this.event.priceRegular: 0;
    const priceCalculation = { regularTicketTotal: this.calcRegular, studentTicketTotal: this.calcStudent};
    const mergeObj = { ...paramIds, ...this.reservationForm.value, ...priceCalculation};
    this.addReservation.createItemWithAutoId(mergeObj)
      .then(() => {
     this.dialog.open(this.secondDialog);
      })
      .catch((error) => {
        console.error('Error creating item:', error);
      });
  }

  public onCloseSummaryDialog():void {
    this.router.navigate(['/list-client']);
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['eventId'];
    this.clientId = this.route.snapshot.params['clientId'];
    this.spectacleService
    .getSpectacleById(this.eventId)
    .subscribe((event: any) => {
      this.event = event;
      console.log('res', event)
    });
    this.clientService
    .getClientById(this.clientId)
    .subscribe((client: any) => {
      this.client = client;
      console.log('client', client)
    });

  }

  ngOnDestroy(): void {}
}
