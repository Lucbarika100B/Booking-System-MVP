import { Price } from "src/models/price-model/price.model";
import { Spectacles } from "../spectacle-model/spectacles.model";
import { Client } from "../client-model/client.model";

export class Reservations {
    $key ? : string | null; 
    spectacle? : Spectacles;
    price? : Price[];
    clientDetails? : Client; 
    
}
