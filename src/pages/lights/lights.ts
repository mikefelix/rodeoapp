import { Component, OnInit } from '@angular/core';
import { HouseState } from "../../models/HouseState";
import { AlertController, IonicPage } from 'ionic-angular';
import { House } from '../../providers/house';
import { Bulbs } from '../../models/Bulbs';
import { LightsProvider } from '../../providers/lights';
import { ThermProvider } from '../../providers/therm';
import { SchedulesProvider } from '../../providers/schedules';

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
  poo = true

  constructor(public lights: LightsProvider, public therm: ThermProvider, public sched: SchedulesProvider, public alertCtrl: AlertController) {
  }

  ngOnInit():void {
    this.lights.subject.subscribe(bulbs => {
      this.bulbs = bulbs;
      this.loading = false;
      this.loaded = true;
    });

    this.sched.subject.subscribe(sc => this.schedules = sc);
    this.therm.subject.subscribe(therm => this.homeIcon = `assets/img/${therm.away ? 'homezzz' : 'home'}.png`);
    this.loaded = false;
  }
   
  ionSelected(){
    this.refreshState();
  }

  toggle(bulb, ev) {
    if (!this.bulbs[bulb]) return;

    this.bulbs[bulb].on = !this.bulbs[bulb].on;

    if (this.bulbs[bulb].on){
      this.lights.lightOn(bulb);
    }
    else {
      this.lights.lightOff(bulb);
    }
  }
  
  isOn(bulb){
    return this.bulbs && this.bulbs[bulb] && this.bulbs[bulb].on;
  }

  isOff(bulb){
    return !this.bulbs || !this.bulbs[bulb] || !this.bulbs[bulb].on;
  }

  bulbNames(){
    return Object.keys(this.bulbs || []).filter(name => this.bulbs[name] && name != 'history' && name != 'breezeway' && name != 'garage').sort();
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
        if (schedules[s].spec.match(/[a-z]+/) && schedules[s].date)
          schedText += ` (${schedules[s].date.replace(/^.*, ?/, '')})`;

        schedText += '<br/>';
    }

    this.alertCtrl.create({
      title: this.cap(bulb),
      subTitle: schedText,
      buttons: [
        {
          text: 'Force on', 
          handler: data => {
            console.log(`Force ${bulb} on.`);
            this.lights.lightOn(bulb, true);
          }
        },
        {
          text: 'Force off', 
          handler: data => {
            console.log(`Force ${bulb} off.`);
            this.lights.lightOff(bulb, true);
          }
        },
        {
          text:'Run schedule',
          role: 'cancel'
        }
    ]
    }).present();
  }
  
}
