import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { SessionService } from "./session.service";
import { Observable } from "rxjs";
import { APIResponse } from "../model/apiResponse.interface";

@Injectable({
    providedIn: 'root'
  })
  export class RegisterUserService {
  
    baseApiUrl: string = environment.baseApiUrl;
    private usertoken: string = '';
    constructor(private http: HttpClient,private sessionService:SessionService) { 
      this.usertoken=sessionService.getToken()|| '';
    }
  
    getUser(): Observable<APIResponse<any>> {
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.usertoken}`
      });
      return this.http.get<APIResponse<any>>(this.baseApiUrl + '/api/UsersController/GetUser',{headers});
    }
    getAllUsers(): Observable<APIResponse<any>> {
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.usertoken}`
      });
      return this.http.get<APIResponse<any>>(this.baseApiUrl + '/api/RegisterUserController/GetAll',{headers});
    }
    deleteUser(registerUserId: number) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.usertoken}`
      });
    
      return this.http.request('delete', this.baseApiUrl + '/api/RegisterUserController/DeleteRegisteredUser', {
        body: registerUserId,
        headers: headers,
      });
    }
    activateUser(registerId: number) {
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.usertoken}`
      });
    
      return this.http.request('put', this.baseApiUrl + '/api/RegisterUserController/UpdateUserStatus', {
        body: registerId,
        headers: headers,
      });
    }
}