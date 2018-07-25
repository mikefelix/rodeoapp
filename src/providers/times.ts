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
export class TimesProvider {  
  private url = 'https://mozzarelly.com/home/state/times';

  subject = new BehaviorSubject<Times>(new Times());
  
  constructor(public http: HttpClient) { 
    this.refresh();
  }

  refresh() {
    this.http.get(this.url)
      .catch(this.handleError)
      .subscribe(data => this.subject.next(data as Times));
  }

  handleError(error: Response | any){
    console.error('TimesProvider', error);
    if (typeof error == 'object')
      console.log(JSON.stringify(error));
    
    return Observable.throw(error);
  }

}
