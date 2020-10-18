import { Component, OnInit } from '@angular/core';
import { ProcessValuteDataService} from "../services/process-valute-data.service";
import ValuteDictionary, {ValuteCode} from "../Classes/ValuteDictionary";
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private valutes: ProcessValuteDataService) {
  }
  public course: number;
  public code: ValuteCode;
  private subscription: Subscription;

  async ngOnInit() {
    this.code = ValuteDictionary.EUR;
    await this.getValuteCourse();
    this.subscription = interval(10000).subscribe(val => this.getValuteCourse());
  }

  async getValuteCourse() {
    this.course = await this.valutes.processValute(this.code)
  }

}
