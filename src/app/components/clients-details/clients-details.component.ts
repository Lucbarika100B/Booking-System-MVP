import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Client } from 'src/models/client-model/client.model';
import { ClientsService } from 'src/app/services/clients-services/clients.service';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css'],
})
export class ClientsDetailsComponent implements OnInit, OnChanges {
  @Input() public client: Client;
  @Input() public childAction: string;
  @Output() completedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  message = '';

  constructor(private clientService: ClientsService) {
    this.client = new Client();
    this.childAction='';
  }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
  }

  async updateClient(): Promise<void> {
    const key: string = this.client.id as string;
    console.log(`${key}  et  ${JSON.stringify(this.client)}`)
    if(this.childAction==='update') { 
      await this.clientService.update(key,this.client);
     }
    else if(this.childAction==='delete') {  
      await this.clientService.delete(key);
    }
    this.message = `Client successfully ${this.childAction==='update'?'updated':'deleted'}!`;
    this.completedChange.emit(false);
  }

  async deleteClient() : Promise<void> {
    const key: string = this.client.id as string;
    await this.clientService.delete(key);
    this.message = 'Client successfully updated!';
    this.completedChange.emit(false);
  }
}
