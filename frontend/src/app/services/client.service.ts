import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Client } from '../models/client.model'
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _baseUrl: string = environment.BASE_API_URL;
  constructor(private readonly _http: HttpClient) {}

  public getClients() {
    return this._http.get<Client[]>(this._baseUrl + "/client");
  }

  public createClient(client: any) {
    return this._http.post<Client>(this._baseUrl + "/client", client);
  }

  public updateClient(id: any, data: any) {
    return this._http.put(`${this._baseUrl}/client/${id}`, data);
  }

  public deleteClient(id: any) {
    return this._http.delete(`${this._baseUrl}/client/${id}`);
  }
}
