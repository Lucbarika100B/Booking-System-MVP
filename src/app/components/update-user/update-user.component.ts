import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients-services/clients.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
 clientForm: FormGroup | any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private clientService : ClientsService,
    public dialogRef: MatDialogRef<UpdateUserComponent>
  ) {}


  ngOnInit(): void {
    this.clientForm = this.builder.group({
      nom: new FormControl(this.data.nom || ''),
      prenom: new FormControl(this.data.prenom || ''),
      adresse: new FormControl(this.data.adresse || ''),
      numeroTel: new FormControl(this.data.numeroTel || '')

    });
  }


  public onSubmit():void {
    this.clientService.updateClientById(this.data.clientId, this.clientForm.value)
    .then(() => {
      
      this.dialogRef.close();
      console.log('Object updated successfully');
    })
    .catch((error) => {
      console.error('Error updating object:', error);
    });
  }


}
