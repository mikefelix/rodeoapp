import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Alarm } from '../models/Alarm';

@Injectable()
export class AlarmProvider {
  private stateUrl = 'https://mozzarelly.com/home/state/garage';
  private openUrl = 'https://mozzarelly.com/home/openTIME?auth=Gd9kkwtTv7BW2p0Fg';
  private closeUrl = 'https://mozzarelly.com/home/close?auth=Gd9kkwtTv7BW2p0Fg';

  openMins = 5;
  
  subject = new BehaviorSubject<Alarm>(new Alarm());

  constructor(private http: HttpClient){
    this.refresh();
  }

  refresh() {
    this.http.get(this.stateUrl)
      .catch(this.handleError)
      .subscribe(data => this.subject.next(data as Alarm));
  }

  handleError(error: Response | any){
    console.error('AlarmProvider error:');
    if (typeof error == 'object')
      console.log(JSON.stringify(error));

    return Observable.throw(error);
  }

}
