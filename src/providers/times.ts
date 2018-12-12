import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import { Times } from '../models/Times';
import { Provider } from './provider';

@Injectable()
export class TimesProvider extends Provider<Times>{  
  dataTypeName = "times";
  urls = {state: 'https://mozzarelly.com/home/state/times'};
  defaultValue = new Times();
  
  constructor(public http: HttpClient) { 
    super(http)
    this.refresh();
  }

}
