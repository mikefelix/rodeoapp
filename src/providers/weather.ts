import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HouseState } from '../models/HouseState';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import { BehaviorSubject } from 'rxjs';
import { Current } from '../models/Current';
import { Forecast } from '../models/Forecast';
import { History } from '../models/History';
import { Times } from '../models/Times';

@Injectable()
export class WeatherProvider {  
  private currentUrl = 'https://mozzarelly.com/weather/current';
  private forecast1Url = 'https://mozzarelly.com/weather/forecast1';
  private forecast2Url = 'https://mozzarelly.com/weather/forecast2';
  private historyUrl = 'https://mozzarelly.com/weather/historical';

  currentSubject = new BehaviorSubject<Current>(new Current());
  forecast1Subject = new BehaviorSubject<Forecast>(new Forecast());
  forecast2Subject = new BehaviorSubject<Forecast>(new Forecast());
  historySubject = new BehaviorSubject<History>(new History());
  
  constructor(public http: HttpClient) { 
    this.refresh();
  }

  refresh() {
    this.http.get(this.currentUrl)
      .catch(this.handleError)
      .subscribe(data => this.currentSubject.next(data as Current));

    this.http.get(this.forecast1Url)
      .catch(this.handleError)
      .subscribe(data => this.forecast1Subject.next(data as Forecast));

    this.http.get(this.forecast2Url)
      .catch(this.handleError)
      .subscribe(data => this.forecast2Subject.next(data as Forecast));

    this.http.get(this.historyUrl)
      .catch(this.handleError)
      .subscribe(data => this.historySubject.next(data as History));
  }

  handleError(error: Response | any){
    console.error('WeatherProvider', error);
    if (typeof error == 'object')
      console.log(JSON.stringify(error));
    
    return Observable.throw(error);
  }

}
