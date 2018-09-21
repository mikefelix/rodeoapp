import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/toPromise';
import { Alarm } from '../models/Alarm';

@Injectable()
export class AlarmProvider {
  private getUrl = 'https://mozzarelly.com/home/state/alarm';
  private postUrl = 'https://mozzarelly.com/home/alarm/DAYS/TIME?auth=Gd9kkwtTv7BW2p0Fg';
  private toggleUrl = 'https://mozzarelly.com/home/alarm/DAYS/STATE?auth=Gd9kkwtTv7BW2p0Fg';
  private sleepUrl = 'https://mozzarelly.com/home/alarm/DAYS/sleep?auth=Gd9kkwtTv7BW2p0Fg';
  private overrideUrl = 'https://mozzarelly.com/home/alarm/t1/TIME?auth=Gd9kkwtTv7BW2p0Fg';

  subject = new BehaviorSubject<Alarm>(null);

  constructor(private http: HttpClient){
    this.refresh();
  }

  refresh() {
    this.http.get(this.getUrl)
      .catch(this.handleError)
      .subscribe(data => {
        console.log(JSON.stringify(data));
        this.subject.next(data);
      });
  }

  handleError(error: Response | any){
    console.error('AlarmProvider error:');
    if (typeof error == 'object')
      console.log(JSON.stringify(error));

    return Observable.throw(error);
  }

  changeTime(day, time){
    return this.http.post(this.postUrl.replace(/TIME/, time).replace(/DAYS/, day), '')
             .toPromise()
             .then((a) => {
               console.log('refresh from change. ' + a)
               this.refresh();
             })
             .catch(this.handleError)
  }

  power(day, state){
    return this.http.post(this.toggleUrl.replace(/STATE/, state ? 'on' : 'off').replace(/DAYS/, day), '')
             .catch(this.handleError)
             .subscribe(() => {
                console.log('refresh from power')
                this.refresh();
             });
  }

  sleep(days){
    return this.http.post(this.sleepUrl.replace(/DAYS/, days), '')
             .catch(this.handleError)
             .subscribe(() => {
                console.log('refresh from sleep')
                this.refresh();
              });
  }

  override(time: string) {
    console.log(`override next alarm to ${time}`);
    return this.http.post(this.overrideUrl.replace(/TIME/, time), '')
             .catch(this.handleError)
             .subscribe(() => {
                console.log('refresh from override')
                this.refresh();
              });
  }
}
