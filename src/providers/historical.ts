import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import { History } from '../models/History';
import { Provider } from './provider';

@Injectable()
export class HistoricalWeatherProvider extends Provider<History>{  
  dataTypeName = 'historical';
  defaultValue = new History();
  urls = {state: 'https://mozzarelly.com/weather/historical'};

  constructor(public http: HttpClient) {
    super(http);
  }

}
