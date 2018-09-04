import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Thermostat } from '../models/Thermostat';

@Injectable()
export class ThermProvider {
  private thermUrl = 'https://mozzarelly.com/home/state/thermostat';

  openMins = 5;
  
  subject = new BehaviorSubject<Thermostat>(new Thermostat());

  constructor(private http: HttpClient){
    this.refresh();
  }

  turnOnTherm(){
    this.http.post(this.thermUrl, '')
      .catch(this.handleError)
      .subscribe(data => this.refresh());
  }

  refresh() {
    console.log('refreshing');
    this.http.get(this.thermUrl)
      .catch(this.handleError)
      .subscribe(data => this.subject.next(data as Thermostat));
  }

  handleError(error: Response | any){
    console.error('ThermProvider error:');
    if (typeof error == 'object')
      console.log(JSON.stringify(error));

    return Observable.throw(error);
  }

}
