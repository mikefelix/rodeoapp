import { Component, OnInit } from '@angular/core';
import { HouseState } from "../../models/HouseState";
import { AlertController, IonicPage } from 'ionic-angular';
import { House } from '../../providers/house';
import { Bulbs } from '../../models/Bulbs';
import { Lights } from '../../providers/lights';
import { Therm } from '../../providers/therm';

@IonicPage()
@Component({
  selector: 'page-lights',
  templateUrl: 'lights.html'
})
export class LightsPage implements OnInit {
  loading = true;
  loaded = false;
  bulbs = new Bulbs();
  schedules: {};
  history: {};
  errorMessage: string;
  homeIcon: string;

  onIcon = 'build/toggle-filled.png';
  offIcon = 'build/toggle.png';
  
  constructor(public lights: Lights, public therm: Therm, public alertCtrl: AlertController) {
  }

  ngOnInit():void {
    this.lights.subject.subscribe(bulbs => {
      this.bulbs = bulbs;
      this.loading = false;
    });

    this.therm.subject.subscribe(therm => this.homeIcon = `assets/img/${therm.away ? 'homezzz' : 'home'}.png`);
  }
   
  toggle(bulb, ev) {
    if (this.bulbs[bulb]){
      this.lights.lightOff(bulb);
    }
    else {
      this.lights.lightOn(bulb);
    }
  }
  
  isOn(bulb){
    return this.bulbs && this.bulbs[bulb];
  }

  isOff(bulb){
    return !this.bulbs || !this.bulbs[bulb];
  }

  bulbNames(){
    return Object.keys(this.bulbs || []).filter(name => name != 'history' && name != 'breezeway' && name != 'garage').sort();
  }

  refreshStyle(){
    return {
      opacity: this.loading ? '0.4' : ''
    }
  }

  refreshState(after = null){
    if (after){
      setTimeout(this.refreshState.bind(this), after * 1000);
    }
    else {
      this.loading = true;
      this.lights.refresh();
      this.therm.refresh();
    }
  }

  cap(name: String){
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }

  info(bulb: string){
    let schedules = this.schedules[bulb] || {};
    let schedText = '';
    for (let s in schedules){
        schedText += `${this.cap(s)} time: ${schedules[s].spec}`;
        if (schedules[s].spec.match(/[a-z]+/))
          schedText += ` (${schedules[s].date.replace(/^.*, ?/, '')})`;

        schedText += '<br/>';
    }

    this.alertCtrl.create({
      title: this.cap(bulb),
      subTitle: schedText,
      buttons: ['OK']
    }).present();
  }
  
}
