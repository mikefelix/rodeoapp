import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

@Injectable()
export class HistoryProvider {
  private url = 'https://mozzarelly.com/home/history';

  subject = new BehaviorSubject<string>("");

  constructor(private http: HttpClient){
    this.refresh();
  }

  refresh() {
    this.http.get(this.url)
      .catch(this.handleError)
      .subscribe(data => {
        this.subject.next(data);
      });
  }

  handleError(error: Response | any){
    console.error('HistoryProvider error:');
    if (typeof error == 'object')
      console.log(JSON.stringify(error));
    else
      console.log(error);

    return Observable.throw(error);
  }

}
