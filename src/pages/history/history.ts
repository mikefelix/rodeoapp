import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { House } from '../../providers/house';
import { HouseState } from '../../models/HouseState';
import { ThermProvider } from '../../providers/therm';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage implements OnInit {
  history: {};
  errorMessage: string;
  loaded = false;
  homeIcon: string;

  constructor(private house: House, private therm: ThermProvider) {
  }

  ngOnInit() {
    this.house.subject.subscribe(this.reflectState.bind(this));
  }

  ionSelected(){
    this.therm.refresh();
  }

  historyText(){
    JSON.stringify(this.history);
  }

  reflectState(data: HouseState){
    this.history = data.history;
    this.homeIcon = `assets/img/${data.thermostat.away ? 'homezzz' : 'home'}.png`;
    this.loaded = true;
  }

}
