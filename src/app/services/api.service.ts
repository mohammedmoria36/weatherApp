import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getWeatherData(body) {
    const url = `${environment.DOMAIN.URL}?q=${body.name}&units=metric&appid=${environment.APIKEY.key}`;
    console.log(url, 'URL')
    return this.http.get<any>(url).toPromise();
  }
}
