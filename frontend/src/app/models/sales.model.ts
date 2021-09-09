import { Client } from "./client.model";
import { Detail } from "./detail.model";

export interface Sale {
    id: number,
    client_id: number,
    sale_at: Date,
    iva: number,
    discount: number,
    total: number,
    Client?: Client,
    Details?: Detail[]
}