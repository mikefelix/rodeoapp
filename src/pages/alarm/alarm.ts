import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AlarmProvider } from '../../providers/alarm';
import { Alarm } from '../../models/Alarm';
import { ThermProvider } from '../../providers/therm';

@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html'
})
export class AlarmPage implements OnInit {
  ringing: boolean;
  time: string;
  errorMessage: string;
  loaded = false;
  homeIcon: string;

  constructor(private provider: AlarmProvider, private therm: ThermProvider) {
  }

  ngOnInit() {
    this.provider.subject.subscribe(this.reflectState.bind(this));
    this.therm.subject.subscribe(therm => this.homeIcon = `assets/img/${therm.away ? 'homezzz' : 'home'}.png`);
  }

  ionSelected(){
    this.therm.refresh();
  }

  reflectState(data: Alarm){
    this.time = data.time;
    this.ringing = data.ringing;
    this.loaded = true;
  }

  ringingText(){
    return this.ringing ? "ringing" : "off";
  }
}
