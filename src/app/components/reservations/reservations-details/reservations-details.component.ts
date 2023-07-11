import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { combineLatest, tap } from "rxjs";
import { ReservationsService } from "src/app/services/reservations-service/reservations.service";
import { SpectaclesService } from "src/app/services/spectacles-service/spectacles.service";
import { UpdateUserComponent } from "../../update-user/update-user.component";
import { CSVServiceService } from "src/app/services/csv-service/csvservice.service";

@Component({
  selector: "app-reservations-details",
  templateUrl: "./reservations-details.component.html",
  styleUrls: ["./reservations-details.component.css"],
})
export class ReservationsDetailsComponent implements OnInit {
  public eventId: any;
  public event: any;
  public clientDetails: any[] = [];
  public reservationDetails: any;
  public mergedData: any[] = [];
  public  eventDetails: any;
  constructor(
    private reservationService: ReservationsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private spectacleServices: SpectaclesService,
    private csvService : CSVServiceService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params["eventId"];
    this.spectacleServices
      .getSpectacleById(this.eventId)
      .subscribe((res: any) => {
        this.eventDetails = res;
      });

      this.loadEvents();
  }

 public  loadEvents() : void{
    this.reservationService.getDocumentByEventId(this.eventId)
    .subscribe(
      (data: any) => {
        this.reservationDetails = data;
        const clientIds = data.map((item: any) => item.clientId);
        this.getClientDetails(clientIds);
      },
      (error) => console.error("Error:", error)
    );
  }

 public  openDialog(item: any) : void  {
    let dialogRef = this.dialog.open(UpdateUserComponent, {
      data: item,
      panelClass: "custom-dialog",
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadEvents();
      console.log(`Dialog result: ${result}`);
    });
  }

  public getClientDetails(clientIds: string[]): void {
    if (clientIds.length === 0) {
      return;
    }
    const observables = clientIds.map((clientId) =>
      this.reservationService.getClientDetails(clientId)
    );
    combineLatest(observables)
      .pipe(
        tap((clientDetails: any[]) => {
          this.mergedData = []; 
          this.reservationDetails.forEach((reservation: any) => {
            const clientDetail = clientDetails.find(
              (client: any) => client?.id === reservation.clientId
            );
            if (clientDetail) {
              const mergedObject = { ...reservation, ...clientDetail };
              this.mergedData.push(mergedObject);
              console.log("mergedData", this.mergedData);
            }
          });
        })
      )
      .subscribe(
        () => {},
        (error) => console.error("Error:", error)
      );
  }

  public downloadData():void {
    this.csvService.downloadData(this.mergedData);
  }
}
