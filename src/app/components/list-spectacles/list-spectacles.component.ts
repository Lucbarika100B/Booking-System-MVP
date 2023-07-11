import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SpectaclesService } from 'src/app/services/spectacles-service/spectacles.service';

@Component({
  selector: 'app-list-spectacles',
  templateUrl: './list-spectacles.component.html',
  styleUrls: ['./list-spectacles.component.css'],
})
export class ListSpectaclesComponent implements OnInit {
  @ViewChild('updateShow', { static: true }) updateShowDialog:
    | TemplateRef<any>
    | undefined;
  listOfShows!: any[];
  clientId: string | undefined;

  constructor(
    private spectacleService: SpectaclesService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  public loadShows(): void {
    this.spectacleService
      .getAllSpectacle()
      .valueChanges()
      .subscribe((shows) => {
        this.listOfShows = shows;
        console.log('this.listOfShows', this.listOfShows);
        this.listOfShows.sort((a, b) => Date.parse(a) - Date.parse(b));
      });
  }

  public showBookingDetails(id: any) : void {
    this.router.navigate(['/show-bookings', id]);
     console.log('id', id);
   }

  public onReserve(id: any): void {
    this.router.navigate(['/list-client', this.clientId, id]);
  }

  public onDelete(id: string): void {
    this.spectacleService.deleteSpectacle(id);
    alert('The show was successfully deleted');
  }

  public onUpdateShow(item: any): void {
    this.dialog.open(DialogComponent, {
      data: item,
      panelClass: 'custom-dialog',
    });
  }

  ngOnInit(): void {
    this.loadShows();
    this.clientId = this.route.snapshot.params['clientId'];
  }
}
