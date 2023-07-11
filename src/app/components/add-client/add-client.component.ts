import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients-services/clients.service';
import { Client } from 'src/models/client-model/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})


export class AddClientsComponent implements OnInit {
  client: Client = new Client();
  public isSubmitted = false;

  constructor(private clientService: ClientsService, private router : Router) {}

  ngOnInit(): void {}

  async saveClients(): Promise <void> {
    try {
      if(!this.isFormValid()) {
        alert('Make sure all required fields are filled');
        this.isSubmitted = false;
        return;
      }
      await this.clientService.create(this.client);
      this.isSubmitted =true;
      alert('Client was successfully added');
      this.router.navigateByUrl('/list-client');
    } catch (error) {
      console.error('There was an error when creating client:', error);
    }
  }



  private isFormValid(): boolean {
    return (
      !!this.client.prenom &&
      !!this.client.nom &&
      !!this.client.adresse &&
      !!this.client.numeroTel 
      );
  }
}
