import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
readonly apiUrl="https://localhost:7100/api/RoleMasterController";
  constructor(private http:HttpClient) {  }
   
   getAllRoles():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'/GetAllRoles');
   }
   
   
}
