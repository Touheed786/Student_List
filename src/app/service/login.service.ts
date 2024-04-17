import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, User } from '../user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // const headers = new HttpHeaders();
  // headers.append('Content-Type', 'multipart/form-data');
  // headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

  constructor(private http:HttpClient) { }
  url = "http://localhost:8089";

  create(user:FormData)
  {
    return this.http.post(`${this.url}/user/createuser`,user)
  }

  addProduct(product: Product, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('price', String(product.price));
    formData.append('imageFile', imageFile);

    return this.http.post<any>(`${this.url}/api/products/add`, formData);
}

getAllProd()
{
  return this.http.get(`${this.url}/api/products/allProducts`);
}

bulkDelete(param:HttpParams)
{
  return this.http.put(`${this.url}/user/bulkDelete`,param);
}


}