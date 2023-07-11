import { Injectable, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv';

@Injectable({
  providedIn: 'root'
})
export class CSVServiceService implements OnInit {

  constructor() {}

  public downloadData(data:any[]):void {
    const  csvOptions = 
      { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Customer Data',
        useBom: true,
        noDownload: false,
        headers: ["Show Category", " Client ID", "Event ID" , "Regular Tickets total", 
                  "Number of Regular Tickets ", "Student Tickets total", 
                  "Number of Student Tickets", "Client Adresse", "ID", "Customer Last Name", 
                  "Customer Phone number", "Customer First name" ]
      } ;
   new ngxCsv(data, "ClientsBookings_CSV", csvOptions);
  }

  ngOnInit(): void { }
}
