import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Current } from '../models/Current';
import { Provider } from './provider';

@Injectable()
export class CurrentWeatherProvider extends Provider<Current>{  
  dataTypeName = 'current';
  defaultValue = new Current();
  urls = {state: 'https://mozzarelly.com/weather/current'};

  constructor(public http: HttpClient) {
    super(http);
  }

}
