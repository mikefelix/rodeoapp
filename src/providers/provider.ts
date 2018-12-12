import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

@Injectable()
export abstract class Provider<T> implements OnInit {
  abstract dataTypeName: string;
  abstract defaultValue: T;
  
  subject = new BehaviorSubject<T>(this.defaultValue);
  abstract urls: {}

  constructor(public http: HttpClient){
  }
  
  ngOnInit() {
    // this.refresh();
  }

  refresh() {
    console.log(`Refreshing ${this.dataTypeName} from ${this.urls['state']}`);
    this.http.get(this.urls['state'])
      .catch(this.handleError)
      .subscribe(data => {
        console.log(`Got refresh data for ${this.dataTypeName}: ${JSON.stringify(data)}`)
        this.subject.next(data as T)
      });
  }

  post(type: string, details: {} = {}){
    let url = this.urls[type];
    for (let key in details){
      url = url.replace(key.toUpperCase(), details[key]);
    }

    return this.http.post(url, '')
      .toPromise()
      .then(() => {
        this.refresh();
      })
      .catch(this.handleError)
  }

  handleError(error: Response | any){
    console.error('Provider error:');
    if (typeof error == 'object')
      console.log(JSON.stringify(error));

    return Observable.throw(error);
  }

}
