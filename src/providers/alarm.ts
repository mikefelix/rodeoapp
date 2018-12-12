import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/toPromise';
import { Alarm } from '../models/Alarm';
import { Provider } from './provider';

@Injectable()
export class AlarmProvider extends Provider<Alarm> {
  dataTypeName = 'alarm';
  defaultValue = new Alarm("06:00");

  urls = {
    state: 'https://mozzarelly.com/home/state/alarm',
    time: 'https://mozzarelly.com/home/alarm/DAYS/TIME?auth=%auth%',
    toggle: 'https://mozzarelly.com/home/alarm/DAYS/STATE?auth=%auth%',
    sleep: 'https://mozzarelly.com/home/alarm/tDAYS/off?auth=%auth%',
    override: 'https://mozzarelly.com/home/alarm/t1/TIME?auth=%auth%'
  }

  subject = new BehaviorSubject<Alarm>(null);

  constructor(public http: HttpClient){
    super(http);
  }

  changeTime(day, time){
    return this.http.post(this.urls.time.replace(/TIME/, time).replace(/DAYS/, day), '')
             .toPromise()
             .then((a) => {
               console.log('refresh from change. ' + a)
               this.refresh();
             })
             .catch(this.handleError)
  }

  power(day, state){
    return this.http.post(this.urls.toggle.replace(/STATE/, state ? 'on' : 'off').replace(/DAYS/, day), '')
             .catch(this.handleError)
             .subscribe(() => {
                console.log('refresh from power')
                this.refresh();
             });
  }

  sleep(days: number){
    return this.http.post(this.urls.sleep.replace(/DAYS/, days + ""), '')
             .catch(this.handleError)
             .subscribe(() => {
                console.log('refresh from sleep')
                this.refresh();
              });
  }

  override(time: string) {
    console.log(`override next alarm to ${time}`);
    return this.http.post(this.urls.override.replace(/TIME/, time), '')
             .catch(this.handleError)
             .subscribe(() => {
                console.log('refresh from override')
                this.refresh();
              });
  }
}
