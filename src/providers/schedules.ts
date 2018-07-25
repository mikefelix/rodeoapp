import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HouseState } from '../models/HouseState';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import { BehaviorSubject } from 'rxjs';
import { Current } from '../models/Current';
import { Forecast } from '../models/Forecast';
import { History } from '../models/History';
import { Times } from '../models/Times';

@Injectable()
export class SchedulesProvider {  
  private url = 'https://mozzarelly.com/home/state/schedules';

  subject = new BehaviorSubject<{}>({});
  
  constructor(public http: HttpClient) { 
    this.refresh();
  }

  refresh() {
    this.http.get(this.url)
      .catch(this.handleError)
      .subscribe(data => this.subject.next(data));
  }

  handleError(error: Response | any){
    console.error('SchedulesProvider', error);
    if (typeof error == 'object')
      console.log(JSON.stringify(error));
    
    return Observable.throw(error);
  }

}
