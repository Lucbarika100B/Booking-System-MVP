import { Injectable, } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Spectacles } from 'src/models/spectacle-model/spectacles.model';

@Injectable({
  providedIn: 'root'
})
export class SpectaclesService {

 
  spectacleList : AngularFireList <Spectacles>;
  private spectacleDbPath = '/spectacles';


  constructor(private spectacleDb : AngularFireDatabase, private dialog : MatDialog) {
      this.spectacleList = spectacleDb.list(this.spectacleDbPath);      
   }

   public getAllSpectacle() : AngularFireList <Spectacles> {
      return this.spectacleList;
   }

   public getSpectacleById (id : string) : any {
     return this.spectacleDb.object(`spectacles/${id}`).valueChanges();
   }

   updateObjectById(id: string, updatedData: any): Promise<void> {
      const objectRef = this.spectacleDb.object(`spectacles/${id}`);
      return objectRef.update(updatedData);
    }

    


   public createSepectacle(spectacle : Spectacles) {
      const specElement = this.spectacleList.push(spectacle);
      spectacle.id = specElement.key;
      this.spectacleList.update(spectacle.id as string, spectacle);
      
   }



   public updateSpectacle (key : string, value : any) : Promise <void> {
      return this.spectacleList.remove(key);
   }


   public deleteSpectacle(key : string) : Promise <void> {
      return this.spectacleList.remove(key);
   }

   public deleteAllSpectacle() : Promise <void> {
    return this.spectacleList.remove();
   }


   public showSpectacleSpecDialogMessage(title : string, message : string) : void {
     if(!title) {
      title = 'An error occur in the Spectacle ! try again';
     }
     this.dialog.open(Error, {
      data : {
        title,
        message
        }
     })
   }



}
