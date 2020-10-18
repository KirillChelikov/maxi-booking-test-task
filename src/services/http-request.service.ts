import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(private http: HttpClient) {
  }

  public getDailyJson() {
   return this.http.get('https://www.cbr-xml-daily.ru/daily_json.js');
  }

  public getDailyXml() {
    return this.http.get('https://www.cbr-xml-daily.ru/daily_utf8.xml', {
      headers: new HttpHeaders({
        'Content-Type': 'application/xml'
      }),
      responseType: 'text'
    });
  }
}
