import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import { History } from '../models/History';
import { Provider } from './provider';
import { Current } from '../models/Current';
import { Forecast } from '../models/Forecast';

@Injectable()
export class WeatherProvider extends Provider<Current>{  
  dataTypeName = 'weather';
  defaultValue = new Current();
  urls = {state: 'https://mozzarelly.com/weather/current'};

  constructor(public http: HttpClient) {
    super(http);
  }

}
