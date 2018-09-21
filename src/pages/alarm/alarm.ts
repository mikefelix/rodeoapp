import { Component, OnInit } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { AlarmProvider } from '../../providers/alarm';
import { Alarm } from '../../models/Alarm';
import { ThermProvider } from '../../providers/therm';

@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html'
})
export class AlarmPage implements OnInit {
  alarm: Alarm;
  errorMessage: string;
  loaded = false;
  homeIcon: string;
  days = ["Weekdays", "Weekend", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  dayNums = [0,1,2,3,4,5,6];
  setting = "time";
  sleepDays = 0;
  weekdaysEnabled: boolean;
  weekendsEnabled: boolean;
  weekdayTime: string;
  weekendTime: string;

  constructor(private provider: AlarmProvider, private therm: ThermProvider, private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.provider.subject.subscribe(this.reflectState.bind(this));
    this.therm.subject.subscribe(therm => this.homeIcon = `assets/img/${therm.away ? 'homezzz' : 'home'}.png`);
    this.loaded = false;
  }

  ionSelected(){
    this.refreshState();
  }

  alarmText(){
    if (this.alarm.on) return "The alarm is ringing. Wake up and brew the coffee!";
    else if (this.alarm.next) {
      if (this.alarm.next.enabled) {
        return `The alarm is set to ring ${this.alarm.next.day} at ${this.alarm.next.time}.`;
      }
      else {
        return `The alarm is disabled ${this.alarm.next.day}.`;
      }
    }
    else return "The alarm is disabled.";
  }

  reflectState(data: Alarm){
    if (!data) return;
    this.alarm = data;
    this.weekdaysEnabled = this.alarm.enabled[1] || this.alarm.enabled[2] || this.alarm.enabled[3] || this.alarm.enabled[4] || this.alarm.enabled[5];
    this.weekendsEnabled = this.alarm.enabled[0] || this.alarm.enabled[6];
    this.weekdayTime = this.alarm.times[1];
    this.weekendTime = this.alarm.times[0];
    this.loaded = true;
  }

  cap(name: String){
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }

  refreshState(){
    this.provider.refresh();
  }

  canEdit(){
    return !this.alarm.on;
  }

  dayStyle(i){
    let today = new Date().getDay();
    let ringDay = this.alarm.next.day == 'tomorrow' ? (today + 1) % 7 : today;
    
    return {
      "font-weight": ringDay == i ? 'bold' : 'normal'
    }
  }

  changeTime(day){
    let state: string;
    if (day == -1) {
      day = '06';
      state = this.weekendTime;
    }
    else if (day == -2) {
      day = '12345';
      state = this.weekdayTime;
    }
    else {
      state = this.alarm.times[day];
    }

    /*this.toastCtrl.create({
      message: `Setting ${this.days[day]} to ${this.alarm.times[day]}.`,
      duration: 3000,
      position: 'bottom'
    });*/

    console.log('alarm change for ' + day + ' to ' + state);
    this.provider.changeTime(day, state);
  }

  toggleEnabled(day){
    let state: boolean;
    if (day == -1) {
      day = '06';
      state = !this.weekendsEnabled;
    }
    else if (day == -2) {
      day = '12345';
      state = !this.weekdaysEnabled;
    }
    else {
      state = this.alarm.enabled[day];
    }

    /*this.toastCtrl.create({
      message: `Turning alarm ${this.alarm.enabled ? 'on' : 'off'} for ${this.days[day]}.`,
      duration: 3000,
      position: 'bottom'
    });*/

    console.log('power change for ' + day + ' to ' + state);
    this.provider.power(day, state);
  }

  sleep(days){
    this.provider.sleep(days || this.sleepDays);
  }

  override(time){
    this.provider.override(time || this.alarm.time);
  }
}
