const baseUrl = "http://localhost:8080/api/tutorials";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IUserSection } from "../models/user-section.model";

@Injectable({
  providedIn: "root",
})
export class UserSectionService {
  private baseUrl = "http://localhost:8000/user-sections"; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<IUserSection[]> {
    return this.http.get<IUserSection[]>(this.baseUrl);
  }

  get(name: any): Observable<IUserSection> {
    return this.http.get<IUserSection>(`${this.baseUrl}/${name}`);
  }

  create(data: IUserSection): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(name: any, data: IUserSection): Observable<any> {
    return this.http.put(`${this.baseUrl}/${name}`, data);
  }

  delete(name: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${name}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  // getUserById(userId: number): Observable<IUserSection[]> {
  //   const theUrl = `${this.baseUrl}/${userId}`;
  //   console.log("Sending API Request to:", theUrl); // Log the URL
  //   return this.http
  //     .get<{ data: IUserSection[]; pagination: any }>(theUrl)
  //     .pipe(
  //       map((response) => {
  //         console.log("Raw API Response:", response); // Log the raw API response
  //         return response.data; // Extract the data field
  //       })
  //     );
  // }

  getUserById(userId: number): Observable<IUserSection[]> {
    const theUrl = `${this.baseUrl}/${encodeURIComponent(userId)}`;
    console.log("Sending API Request to:", theUrl);
    return this.http
      .get<{ data: IUserSection[]; pagination: any }>(theUrl)
      .pipe(
        map((response) => response.data) // Extract the `data` array
      );
  }
}
