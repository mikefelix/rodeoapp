import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Garage } from '../models/Garage';
import { Provider } from './provider';

@Injectable()
export class GarageProvider extends Provider<Garage> {
  dataTypeName = "garage";
  defaultValue = new Garage();

  urls = {
    state: 'https://mozzarelly.com/home/state/garagedoor',
    open: 'https://mozzarelly.com/home/openTIME?auth=Gd9kkwtTv7BW2p0Fg',
    close: 'https://mozzarelly.com/home/close?auth=Gd9kkwtTv7BW2p0Fg'
  }

  openMins = 5;
  
  constructor(public http: HttpClient){
    super(http);
  }

  openGarage(time) {
    if (!time) time = this.openMins;
    if (time > 30) time = '';
    this.post('open', { time })
  }

  closeGarage() {
    this.post('close', {});
  }

  handleError(error: Response | any){
    console.error('GarageProvider error:');
    if (typeof error == 'object')
      console.log(JSON.stringify(error));

    return Observable.throw(error);
  }

}
