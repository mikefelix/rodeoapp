import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import { Forecast } from '../models/Forecast';
import { Provider } from './provider';

@Injectable()
export class Forecast2Provider extends Provider<Forecast>{  
  dataTypeName = 'forecast2';
  defaultValue = new Forecast();
  urls = {state: 'https://mozzarelly.com/weather/forecast2'};

  constructor(public http: HttpClient) {
    super(http);
  }

}
