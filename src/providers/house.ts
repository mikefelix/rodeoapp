import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { HouseState } from '../models/HouseState';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

@Injectable()
export class House {
  private stateUrl = 'https://mozzarelly.com/home/state';
  private thermUrl = 'https://mozzarelly.com/home/thermostat';
  private openUrl = 'https://mozzarelly.com/home/openTIME?auth=Gd9kkwtTv7BW2p0Fg';
  private closeUrl = 'https://mozzarelly.com/home/close?auth=Gd9kkwtTv7BW2p0Fg';
  private lightToggleUrl = 'https://mozzarelly.com/home/light/BULB?auth=Gd9kkwtTv7BW2p0Fg';
  private lightOnUrl = 'https://mozzarelly.com/home/alight/BULB?auth=Gd9kkwtTv7BW2p0Fg';
  private lightOffUrl = 'https://mozzarelly.com/home/unlight/BULB?auth=Gd9kkwtTv7BW2p0Fg';

  openMins = 5;
  
  subject = new BehaviorSubject<HouseState>(new HouseState());

  constructor(private http: HttpClient){
    this.refresh();
  }

  turnOnTherm(){
    this.http.post(this.thermUrl, '')
      .catch(this.handleError)
      .subscribe(data => this.refresh());
  }

  toggleLight(bulb){
    this.http.post(this.lightToggleUrl.replace('BULB', bulb), '')
      .catch(this.handleError)
      .subscribe(data => this.refresh())
  }

  lightOn(bulb){
    this.http.post(this.lightOnUrl.replace('BULB', bulb), '')
      .catch(this.handleError)
      .subscribe(data => this.refresh())
  }

  lightOff(bulb){
    this.http.post(this.lightOffUrl.replace('BULB', bulb), '')
      .catch(this.handleError)
      .subscribe(data => this.refresh())
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
      .subscribe(data => this.subject.next(data as HouseState));
  }

  handleError(error: Response | any){
    console.error('HouseProvider error:');
    if (typeof error == 'object')
      console.log(JSON.stringify(error));

    return Observable.throw(error);
  }

}
