import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "http://localhost:8000/auth"; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/token`; // Use backticks for interpolation
    const body = new URLSearchParams();
    body.set("username", username);
    body.set("password", password);

    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });

    return this.http.post(url, body.toString(), { headers });
  }

  getUserProfile(token: string): Observable<any> {
    const url = `${this.baseUrl}/users/me`; // Use backticks for interpolation
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Use backticks for interpolation
    });

    return this.http.get(url, { headers });
  }

  signup(userData: any): Observable<any> {
    const url = `${this.baseUrl}/register`; // Use backticks for interpolation
    return this.http.post(url, userData);
  }

  validateToken(token: string): Observable<any> {
    const url = `${this.baseUrl}/validate-token`; // Use backticks for interpolation
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Use backticks for interpolation
    });

    return this.http.get(url, { headers });
  }
}
