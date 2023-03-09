/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Category } from '../model/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { 

  }

  getCategory(): Observable<Category[]>{
    return this.http.get<Category[]>('http://localhost:3000/api/v1/category');
    // waiting for backend to response and observering the data untill it come 
  }

  getcategory(categoryId: string): Observable<Category>{
    return this.http.get<Category>(`http://localhost:3000/api/v1/category/${categoryId}`);
    // waiting for backend to response and observering the data untill it come 
  }

  createCategory(category:Category): Observable<Category>{
    return this.http.post<Category>('http://localhost:3000/api/v1/category/',category);
  }
  
  deleteCategory(categoryId:string): Observable<Object>{
    return this.http.delete<Object>(`http://localhost:3000/api/v1/category/${categoryId}`)
  }

  updateCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(`http://localhost:3000/api/v1/category/${category.id}`,category);
  }

}
