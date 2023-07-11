import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { SpectaclesService } from '../services/spectacles-service/spectacles.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})

export class DialogComponent implements OnInit {
  spectacleForm: FormGroup | any;
  dateFormat = "yyyy-MM-dd";
  language = "en";


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private spectacleService : SpectaclesService,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  onSubmit() {
    console.log('item', this.spectacleForm?.value as any);
    this.spectacleService.updateObjectById(this.data.id, this.spectacleForm.value)
    .then(() => {
    
      this.dialogRef.close();
      console.log('Object updated successfully');
    })
    .catch((error) => {
      console.error('Error updating object:', error);
    });
  }

  formatFormDate(date: Date) {
    return formatDate(date, this.dateFormat, this.language);
  }

  ngOnInit(): void {
    this.spectacleForm = this.builder.group({
      title: new FormControl(this.data.title),  
      date: new FormControl(this.formatFormDate(this.data.date)),
      time: new FormControl(this.data.time),
      priceStudent: new FormControl(this.data.priceStudent),
      priceRegular: new FormControl(this.data.priceRegular)

    });
    console.log(this.data);
  }
}
