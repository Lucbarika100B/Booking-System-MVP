import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Client } from 'src/models/client-model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private dbPath = '/clients';
  clients : AngularFireList<Client>;

  constructor(private clientDb : AngularFireDatabase) {
    this.clients = clientDb.list(this.dbPath);
  } ; 

  public getClientById (id : string) : any {
    return this.clientDb.object(`clients/${id}`).valueChanges();
  }

  updateClientById(id: string, updatedData: any): Promise<void> {
    const objectRef = this.clientDb.object(`clients/${id}`);
    return objectRef.update(updatedData);
  }

  public getAll(): AngularFireList<Client>  {
    return this.clients;
  } 

  public create(client : Client) : void {
     const element = this.clients.push(client);
     client.id = element.key;
     console.log(element.key);
     this.clients.update(client.id as string, client)
  }

  
  public update (key: string, value: any) : Promise <void> {
    return this.clients.update(key, value);
  }
  

  public delete(key: string) : Promise<void> {
    return this.clients.remove(key);
  }

  public deleteAll(): Promise<void> {
    return this.clients.remove();
  }

} 



