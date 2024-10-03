const baseUrl = 'http://localhost:8080/api/tutorials';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipeSection } from '../models/recipe-section.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeSectionService {
  private baseUrl = 'http://0.0.0.0:8000/recipes_sections'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<IRecipeSection[]> {
    return this.http.get<IRecipeSection[]>(this.baseUrl);
  }

  get(id: any): Observable<IRecipeSection> {
    return this.http.get<IRecipeSection>(`${this.baseUrl}/${id}`);
  }

  create(data: IRecipeSection): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: IRecipeSection): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByRecipeID(recipeID: string): Observable<IRecipeSection[]> {
    console.log('recipeID = ' + recipeID);
    const theUrl = this.baseUrl + '/' + recipeID;
    return this.http.get<IRecipeSection[]>(theUrl);
  }
}
