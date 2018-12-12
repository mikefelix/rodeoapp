import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Thermostat } from '../models/Thermostat';
import { Provider } from './provider';

@Injectable()
export class ThermProvider extends Provider<Thermostat> implements OnInit {
  dataTypeName = "thermostat";
  defaultValue = new Thermostat();
  urls = {state: 'https://mozzarelly.com/home/state/thermostat'};

  constructor(public http: HttpClient){
    super(http);
  }

  turnOnTherm(){
    this.post('state');
  }


  ngOnInit() {
    console.log('initting therm')
    this.refresh();
  }
}
