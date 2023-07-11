import { Client } from "../client-model/client.model";

export class Spectacles {
    $key? : string | null;
    id? : string | null;
    client? : Client;
    titre? : string | null;
    time? : string | null;
    category?: string | null;
    date? : string | undefined | undefined; 
    billet? : string | null;
    price? : string | null;
    createDate? : string | null | undefined;
}


export interface AddSpectacles {
    key? : any;
    title?: any;
    date? : any ;
    price? : any;
    category?: any;
}