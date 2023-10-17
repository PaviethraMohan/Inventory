import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { APIResponse } from '../model/apiResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private usertoken: string | null = null;
  private tokenKey: string = 'userToken'; // Initialize tokenKey here
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {
    // Attempt to load the token from local storage in the constructor
    const storedToken = localStorage.getItem(this.tokenKey);
    if (storedToken) {
      this.usertoken = storedToken;
    }
  }

  setToken(token: string) {
    this.usertoken = token;
    localStorage.setItem(this.tokenKey, token);
    return this.usertoken;
  }

  getToken(): string | null {
    return this.usertoken;
  }
}

