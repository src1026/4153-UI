const baseUrl = "http://localhost:8080/api/tutorials";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IRecipeSection } from "../models/recipe-section.model";

@Injectable({
  providedIn: "root",
})
export class RecipeSectionService {
  private baseUrl = "http://0.0.0.0:8000/recipes_sections"; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<IRecipeSection[]> {
    return this.http.get<IRecipeSection[]>(this.baseUrl);
  }

  get(name: any): Observable<IRecipeSection> {
    return this.http.get<IRecipeSection>(`${this.baseUrl}/${name}`);
  }

  create(data: IRecipeSection): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(name: any, data: IRecipeSection): Observable<any> {
    return this.http.put(`${this.baseUrl}/${name}`, data);
  }

  delete(name: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${name}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByRecipeName(recipeName: string): Observable<IRecipeSection[]> {
    const theUrl = `${this.baseUrl}?recipe_name=${encodeURIComponent(
      recipeName
    )}`;
    return this.http
      .get<{ data: IRecipeSection[]; pagination: any }>(theUrl)
      .pipe(
        map((response) => response.data) // Extract the `data` array
      );
  }
}
