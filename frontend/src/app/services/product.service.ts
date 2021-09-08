import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _baseUrl = environment.BASE_API_URL;
  constructor(private readonly _http: HttpClient) { }

  public getProducts() {
    return this._http.get<Product[]>(this._baseUrl + "/product");
  }

  public createProduct(product: Product) {
    return this._http.post<Product>(this._baseUrl + "/product", product);
  }

  public updateProduct(id: string | number, data: any) {
    return this._http.put(`${this._baseUrl}/product/${id}`, data)
  }

  public deleteProduct(id: string | number) {
    return this._http.delete(`${this._baseUrl}/product/${id}`)
  }
}
