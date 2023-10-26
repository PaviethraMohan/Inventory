import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SessionService } from './session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/apiResponse.interface';
import { countryMasters } from '../model/country.model';

@Injectable({
  providedIn: 'root',
})
export class countryService implements OnInit {
  baseApiUrl: string = environment.baseApiUrl;
  private usertoken: string = '';
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.usertoken = sessionService.getToken() || '';
  }
  ngOnInit(): void {}
  getAllCountry(): Observable<APIResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });
    return this.http.get<APIResponse<any>>(
      this.baseApiUrl + '/api/CountryController/GetAll',
      { headers }
    );
  }
  getActiveCountry(): Observable<APIResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });
    return this.http.get<APIResponse<any>>(
      this.baseApiUrl + '/api/CountryController/GetAllCountry',
      { headers }
    );
  }
  deleteCountry(countryId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });

    return this.http.request(
      'delete',
      this.baseApiUrl + '/api/CountryController/DeleteCountry',
      {
        body: countryId,
        headers: headers,
      }
    );
  }
  activateCountry(countryId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });

    return this.http.request(
      'put',
      this.baseApiUrl + '/api/CountryController/CountryUpdateStatus',
      {
        body: countryId,
        headers: headers,
      }
    );
  }
  updateCountry(newCountry: countryMasters) {
    let data: countryMasters = newCountry;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });
    return this.http.put(
      this.baseApiUrl + '/api/CountryController/CountryUpdate',
      data,
      { headers }
    );
  }
  createCountry(newCountry: countryMasters) {
    let data: countryMasters = newCountry;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });
    return this.http.post(
      this.baseApiUrl + '/api/CountryController/CreateCountry',
      data,
      { headers }
    );
  }
}
