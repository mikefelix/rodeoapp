import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Devices } from '../models/Devices';
import { Provider } from './provider';

@Injectable()
export class DevicesProvider extends Provider<Devices>{
  dataTypeName = 'devices';

  urls = {
    state:            'https://mozzarelly.com/home/state/lights',
    revertOverride:   'https://mozzarelly.com/home/devices/DEVICE/revert?auth=%auth%',
    lightOn:          'https://mozzarelly.com/home/devices/DEVICE/on?auth=%auth%',
    forceLightOn:     'https://mozzarelly.com/home/devices/DEVICE/forceon?auth=%auth%',
    lightOff:         'https://mozzarelly.com/home/devices/DEVICE/off?auth=%auth%',
    forceLightOff:    'https://mozzarelly.com/home/devices/DEVICE/forceoff?auth=%auth%'
  }

  defaultValue = new Devices();

  constructor(public http: HttpClient){
    super(http);
    this.refresh();
  }
  
  revertOverride(device){
    this.post('revertOverride', { device });
  }

  lightOn(device, override = true){
    this.post(override ? 'forceLightOn' : 'lightOn', { device });
  }

  lightOff(device, override = true){
    this.post(override ? 'forceLightOff' : 'lightOff', { device });
  }

}
