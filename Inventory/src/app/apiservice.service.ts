import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { SessionService } from './services/session.service';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private usertoken: string = '';
readonly apiUrl="https://localhost:7100/api/RoleMasterController";
  constructor(private http:HttpClient,private sessionService:SessionService) { 
    this.usertoken=sessionService.getToken()|| '';
   }
   
   getAllRoles():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'/GetAllRoles');
   }
   
   
   
}
