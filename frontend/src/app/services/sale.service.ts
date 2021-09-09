import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sale } from '../models/sales.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private _baseUrl = environment.BASE_API_URL;

  constructor(
    private _http: HttpClient
  ) { }

  
  getAll() {
    return this._http.get<Sale[]>(this._baseUrl + "/sale")
  }

  get(id: string){
    return this._http.get<Sale>(`${this._baseUrl}/sale/${id}`)
  }

  createSale(data: any) {
    return this._http.post<Sale>(this._baseUrl + "/sale", data)
  }

  updateSale(id: any, data: any) {
    return this._http.put(`${this._baseUrl}/sale/${id}`, data);
  }

  deleteSale(id:any) {
    return this._http.delete(`${this._baseUrl}/sale/${id}`)
  }

}
