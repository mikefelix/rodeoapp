import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Bulbs } from '../models/Bulbs';

@Injectable()
export class LightsProvider {
  private stateUrl = 'https://mozzarelly.com/home/state/lights';
  private lightToggleUrl = 'https://mozzarelly.com/home/light/BULB?force=false&auth=Gd9kkwtTv7BW2p0Fg';
  private lightOnUrl = 'https://mozzarelly.com/home/alight/BULB?force=false&auth=Gd9kkwtTv7BW2p0Fg';
  private lightOffUrl = 'https://mozzarelly.com/home/unlight/BULB?force=false&auth=Gd9kkwtTv7BW2p0Fg';

  openMins = 5;
  
  subject = new BehaviorSubject<Bulbs>(new Bulbs());

  constructor(private http: HttpClient){
    this.refresh();
  }

  toggleLight(bulb){
    this.http.post(this.lightToggleUrl.replace('BULB', bulb), '')
      .catch(this.handleError)
      .subscribe(data => this.refresh())
  }

  lightOn(bulb, force = false){
    let url = this.lightOnUrl.replace('BULB', bulb).replace('force=false', 'force=' + force);
    this.http.post(url, '')
      .catch(this.handleError)
      .subscribe(data => this.refresh())
  }

  lightOff(bulb, force = false){
    let url = this.lightOffUrl.replace('BULB', bulb).replace('force=false', 'force=' + force);
    this.http.post(url, '')
      .catch(this.handleError)
      .subscribe(data => this.refresh())
  }

  refresh() {
    this.http.get(this.stateUrl)
      .catch(this.handleError)
      .subscribe(data => {
        //console.log(JSON.stringify(data))
        this.subject.next(data as Bulbs)}
      );
  }

  handleError(error: Response | any){
    console.error('HouseProvider error:');
    if (typeof error == 'object')
      console.log(JSON.stringify(error));

    return Observable.throw(error);
  }

}
