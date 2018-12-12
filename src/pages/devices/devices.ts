import { Component } from '@angular/core';
import { AlertController, IonicPage } from 'ionic-angular';
import { Devices } from '../../models/devices';
import { DevicesProvider } from '../../providers/devices';
import { ThermProvider } from '../../providers/therm';
import { RodeoPage } from '../rodeoPage';
import { TimesProvider } from '../../providers/times';

@IonicPage()
@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html'
})
export class DevicesPage extends RodeoPage<Devices> {
  pageName = "Devices";

  constructor(public devices: DevicesProvider, public thermProvider: ThermProvider, public times: TimesProvider, public alertCtrl: AlertController) {
    super(devices, thermProvider);
  }
  
  schedules: {};

  onInit() {
    this.times.subject.subscribe(sc => {
      if (sc) this.schedules = sc.schedules.schedules;
    });
  }
  
  onRefresh(){
  }

  toggle(bulb) {
    if (!this.data || !this.data[bulb]) return;
    
    this.data[bulb].on = !this.data[bulb].on;
    
    if (this.data[bulb].on){
      this.devices.lightOn(bulb);
    }
    else {
      this.devices.lightOff(bulb);
    }
  }
  
  isOn(bulb){
    return this.data && this.data[bulb] && this.data[bulb].on;
  }
  
  isOff(bulb){
    return !this.data || !this.data[bulb] || !this.data[bulb].on;
  }
  
  bulbNames(){
    return Object.keys(this.data || []).filter(name => this.data[name] && name != 'history' && name != 'breezeway' && name != 'tessel' && name != 'garage' && name != 'piano').sort();
  }
  
  labelStyle(bulb){
    return {
      "font-style": this.data && this.data[bulb].overridden ? 'italic' : 'normal'
    }
  }
  
  translateSpec(spec){
    if (spec.match(/^\//)){
      return `after ${spec.replace('/', '')} minute${spec == '/1' ? '' : 's'}.`;
    }

    return spec;
  }

  info(device: string){
    if (!this.data || !this.data[device]) return '';
    
    let schedules = this.schedules[device] || {};
    let schedText = '';
    for (let s in schedules){
      schedText += `${this.cap(s)} time: ${this.translateSpec(schedules[s].spec)}`;
      if (schedules[s].spec.match(/[a-z]+/) && schedules[s].date)
      schedText += ` (${schedules[s].date.replace(/^.*, ?/, '')})`;
      
      schedText += '<br/>';
    }
    
    let revertButton = { text: 'Revert to schedule', handler: () => this.devices.revertOverride(device) };
    let turnOnButton = { text: 'Turn on', handler: () => this.devices.lightOn(device, false) };
    let forceOnButton = { text: 'Force on', handler: () => this.devices.lightOn(device, true) };
    let turnOffButton = { text: 'Turn off', handler: () => this.devices.lightOff(device, false) };
    let forceOffButton = { text: 'Force off', handler: () => this.devices.lightOff(device, true) };

    let buttons = [], on = this.data[device].on, overridden = this.data[device].overridden, power = this.data[device].power;

    if (power !== undefined){
      schedText += `Current power usage: ${power}.<br/>`;
    }

    if (overridden && on){
      schedText += 'Device has been forced on.';
      buttons = [turnOffButton, forceOffButton, revertButton];
    }
    else if (overridden && !on){
      schedText += 'Device has been forced off.';
      buttons = [turnOnButton, forceOnButton, revertButton];
    }
    else if (!overridden && on){
      buttons = [turnOffButton, forceOffButton];
    }
    else { // !overridden && !on
      buttons = [turnOnButton, forceOnButton];
    }
    
    this.alertCtrl.create({
      title: this.cap(device),
      subTitle: schedText,
      buttons: buttons
    }).present();
  }
  
}
