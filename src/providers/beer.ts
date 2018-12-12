import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Beer } from '../models/Beer';
import { Provider } from './provider';

@Injectable()
export class BeerProvider extends Provider<Beer>{
  dataTypeName = 'beer';
  defaultValue = new Beer(); 
  
  constructor(public http: HttpClient){
    super(http);
  }
  
  urls = {
    state: 'https://mozzarelly.com/home/state/beer',
    set: 'https://mozzarelly.com/home/beer/DRIFTSET/TEMP?auth=%auth%'
  }

  set(setting: string, temp: string, drift = false){
    this.post('set', {
      set: setting,
      temp: temp,
      drift: drift || ''
    });
  }

}
