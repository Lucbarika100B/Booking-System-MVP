import { Component, OnInit, OnDestroy } from '@angular/core';
import { Spectacles } from 'src/models/spectacle-model/spectacles.model';
import { SpectaclesService } from 'src/app/services/spectacles-service/spectacles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-spectacle',
  templateUrl: './add-spectacle.component.html',
  styleUrls: ['./add-spectacle.component.css']
})
export class AddSpectacleComponent implements OnInit, OnDestroy {
  constructor(private spectacleService: SpectaclesService, private router: Router) {}

  public isSpecConfirmed = false;
  public mode = 'creatSpectacle';
  spectacle = new Spectacles();

  dateFormat = "yyyy-MM-dd";
  language = "en";

  formatFormDate(date: Date): any {
    return formatDate(date, this.dateFormat, this.language);
  }

  spectacleForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required]
    }),
    date: new FormControl('', {
      validators: [Validators.required]
    }),
    time: new FormControl('', {
      validators: [Validators.required]
    }),
    billet : new FormControl('', {
      validators: [Validators.required]
    }),
    category: new FormControl('', {
      validators: [Validators.required]
    }),
    priceRegular: new FormControl('', {
      validators: [Validators.required]
    }),
    priceStudent: new FormControl('', {
      validators: [Validators.required]
    }),
    createDate: new FormControl(new Date() as unknown as string, {
      validators: [Validators.required]
    })
  });

  onSubmit() {

      console.log(this.spectacleForm.value);
      this.spectacleService.createSepectacle(this.spectacleForm.value as any);
      this.router.navigate([`list-show`]);

  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
