import {Component, ViewChild, OnInit} from '@angular/core';
import { ClientsService } from 'src/app/services/clients-services/clients.service';
import { Client } from 'src/models/client-model/client.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-clients',
  templateUrl:  './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})

export class ListClientsComponent implements OnInit{

  public selectedClient: Client = undefined as any;
  private clientList : Client [] = [] ;
  public isChildActive: boolean = false;
  public childAction: string = '';

  constructor (private clientService : ClientsService, private router : Router) {
    clientService.getAll().valueChanges().subscribe(list => {
      this.clientList = list;
      console.log('this.clientList', this.clientList);
    });
  }

  
  public bookAShow(id: any) : void {
   this.router.navigate(['/list-client', id]);
  }
  
  public get clients():Client[] {
    return this.clientList;
  }

  ngOnInit(): void {}

  public refreshList() : void {
     this.clientService.getAll().valueChanges().subscribe((list: Client[]) => {
      this.clientList = list;
    });
  }

  public updateClient(client : Client):void {
    this.selectedClient = client;
    this.isChildActive = true;
    this.childAction = 'update';
  }

  deleteClient(client : Client) : void {
    this.selectedClient = client;
    this.isChildActive=true;
    this.childAction = 'delete';
  }

  async removeClient(key:string) : Promise <void> {
    this.clientService.delete(key);
  }

  public setChildActive(value: boolean):void{
      this.isChildActive = value;
  }

}
