import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Garage } from '../models/Garage';

@Injectable()
export class GarageDoor {
  private stateUrl = 'https://mozzarelly.com/home/state/garage';
  private openUrl = 'https://mozzarelly.com/home/openTIME?auth=Gd9kkwtTv7BW2p0Fg';
  private closeUrl = 'https://mozzarelly.com/home/close?auth=Gd9kkwtTv7BW2p0Fg';

  openMins = 5;
  
  subject = new BehaviorSubject<Garage>(new Garage());

  constructor(private http: HttpClient){
    this.refresh();
  }

  openGarage(time): void {
    if (!time) time = this.openMins;
    if (time > 30) time = '';

    let url = this.openUrl.replace('TIME', time);
    this.http.post(url, '')
      .map(this.refresh.bind(this))
      .catch(this.handleError)
      .subscribe();
  }

  closeGarage(): void {
    this.http.post(this.closeUrl, '')
      .map(this.refresh.bind(this))
      .catch(this.handleError)
      .subscribe();
  }

  refresh() {
    this.http.get(this.stateUrl)
      .catch(this.handleError)
      .subscribe(data => this.subject.next(data as Garage));
  }

  handleError(error: Response | any){
    console.error('GarageProvider error:');
    if (typeof error == 'object')
      console.log(JSON.stringify(error));

    return Observable.throw(error);
  }

}
