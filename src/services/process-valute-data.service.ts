import {Injectable} from '@angular/core';
import {HttpRequestsService} from "./http-request.service";
import ValuteDictionary, {ValuteCode} from '../Classes/ValuteDictionary'
import DailyJson from "../Classes/DailyJson";
import * as converter from 'xml-js'

@Injectable({
  providedIn: 'root'
})
export class ProcessValuteDataService {

  constructor(private http: HttpRequestsService) {
  }

  private getValutes(): Promise<any> {
    return new Promise((resolve) => {
      this.http.getDailyJson().subscribe((data: DailyJson) => resolve(new DailyJson(data)),
          err => this.http.getDailyXml()
          .subscribe(data => resolve(data),
              err => console.log(err)));
    })
  }

  public async processValute(valuteCode: ValuteCode): Promise<number> {
    const inData: any = await this.getValutes();
    let result;
    switch (true) {
      case inData instanceof DailyJson: {
        result = inData.valutes[valuteCode].Value
        break;
      }
      case typeof inData === 'string': {
        const converted = converter.xml2json(inData, {compact: true, spaces: 2});
        const parsed = JSON.parse(converted);
        result = parsed.ValCurs.Valute.find(valute => valute.CharCode._text === valuteCode).Value._text;
        break;
      }
    }
    return result;
  }

}



