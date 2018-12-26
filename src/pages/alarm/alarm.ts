import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AlarmProvider } from '../../providers/alarm';
import { Alarm } from '../../models/Alarm';
import { ThermProvider } from '../../providers/therm';
import { RodeoPage } from '../rodeoPage';

@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html'
})
export class AlarmPage extends RodeoPage<Alarm> {
  pageName = "Alarm";

  days = ["Weekdays", "Weekend", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  dayNums = [0,1,2,3,4,5,6];
  sleepTime = '10:00'; // only minutes used, to hold sleep days value
  overrideTime = "";
  weekdaysEnabled: boolean;
  weekendsEnabled: boolean;
  weekdayTime: string;
  weekendTime: string;

  constructor(public provider: AlarmProvider, public thermProvider: ThermProvider) {
    super(provider, thermProvider);
    this.segment = "time";
  }

  historyText(){
    if (!this.data) return "";    
    if (!this.data.lastTriggered) return "none";
    console.log(this.data.lastTriggered.day)
    return `${this.data.lastTriggered.day.substring(4, 6)}/${this.data.lastTriggered.day.substring(6, 8)} ${this.data.lastTriggered.time} (${this.data.lastTriggered.action})`;
  }

  alarmText(){
    if (!this.data) return "";

    if (this.data.on) return "The alarm is ringing. Wake up and brew the coffee!";
    else if (this.data.override){
      if (this.data.override.disable && this.data.override.days > 0)
        return `The alarm is disabled for ${this.data.override.days} day${this.data.override.days == 1 ? '' : 's'}.`;
      else if (this.data.override.time)
        return `The alarm is overridden to ring at ${this.data.next.time} ${this.data.next.day}.`;
      else
        return "The alarm is overridden but it's not clear how.";
    }
    else if (this.data.next) {
      if (this.data.next.enabled)
        return `The alarm is set to ring ${this.data.next.day} at ${this.data.next.time}.`;
      else 
        return `The alarm is disabled ${this.data.next.day}.`;
    }
    else 
      return "The alarm is disabled.";
  }

  onInit(){}

  onRefresh(){
    if (!this.data) return;

    this.weekdaysEnabled = this.data.enabled[1] || this.data.enabled[2] || this.data.enabled[3] || this.data.enabled[4] || this.data.enabled[5];
    this.weekendsEnabled = this.data.enabled[0] || this.data.enabled[6];
    this.weekdayTime = this.data.times[1];
    this.weekendTime = this.data.times[0];
    if (this.data.override){
      if (this.data.override.disable){
        let days = this.data.override.days + "";
        this.sleepTime = '10:' + (days.length == 1 ? "0" : "") + days;
      }

      if (this.data.override.time){
        this.overrideTime = this.data.override.time;
      }
    }
    else {
      this.overrideTime = this.data.next.time;
    }
      
    this.loaded = true;
  }

  canEdit(){
    if (!this.data) return false;
    if (this.data.on) return false;
    if (!this.data.enabled) return true;
    if (this.data.override && (this.data.override.disable || this.data.override.days > 0 || this.data.override.time)) return true;
    if (this.data.next.day == 'tomorrow') return true;
    if (new Date().getHours() >= 6 && new Date().getHours() < 11) return false;
    return true;
  }

  dayStyle(i){
    if (!this.data) return {};

    let today = new Date().getDay();
    let ringDay = this.data.next.day == 'tomorrow' ? (today + 1) % 7 : today;
    
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
      state = this.data.times[day];
    }

    /*this.toastCtrl.create({
      message: `Setting ${this.days[day]} to ${this.data.times[day]}.`,
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
      state = this.data.enabled[day];
    }

    /*this.toastCtrl.create({
      message: `Turning alarm ${this.data.enabled ? 'on' : 'off'} for ${this.days[day]}.`,
      duration: 3000,
      position: 'bottom'
    });*/

    console.log('power change for ' + day + ' to ' + state);
    this.provider.power(day, state);
  }

  sleep(days: number){
    if (!days){
      days = +this.sleepTime.split(':')[1];
    }

    this.provider.sleep(days);
  }

  override(time){
    this.provider.override(time || this.overrideTime);
  }
}
