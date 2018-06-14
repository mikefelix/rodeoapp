import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Current } from "../../models/Current";
import { Forecast } from "../../models/Forecast";
import { History } from "../../models/History";
import { House } from '../../providers/house';
import { Weather } from '../../providers/weather';
import { Times } from '../../models/Times';
import { HouseState } from '../../models/HouseState';
import { Thermostat } from '../../models/Thermostat';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage implements OnInit {
  selectedSegment: string = 'current';
  errorMessage: string;
  time: { ampm: string, hour: string, minutes: string };
  homeIcon: string;
  current: Current;
  forecast1: Forecast;
  forecast2: Forecast;
  history: History;
  therm: Thermostat;
  times: Times = new Times();

  constructor(private weather: Weather, private house: House) {
    let date = new Date();

    this.time = {
      ampm: (date.getHours() >= 12 ? 'pm' : 'am'),
      hour: (date.getHours() > 12 ? date.getHours() - 12 : (date.getHours() == 0 ? '12' : date.getHours())).toString(),
      minutes: date.getMinutes().toString().replace(/^(.)$/, '0$1')
    }
  }

  refreshState(){
    this.weather.refresh();
    this.house.refresh();
  }

  image(cond: string){
    return `https://mozzarelly.com/weathericons/${cond}.png`;
  }

  turnOnTherm(){
    this.house.turnOnTherm();
  }

  dir(forecast: Forecast){
    return forecast.night ? "↓" : "↑";
  }

  loaded(){
    return this.current && this.forecast1 && this.forecast2;
  }

  ngOnInit() {
    this.weather.currentSubject.subscribe(data => { this.current = data as Current; });
    this.weather.forecast1Subject.subscribe(data => { this.forecast1 = data as Forecast; });
    this.weather.forecast2Subject.subscribe(data => { this.forecast2 = data as Forecast; });
    this.weather.historySubject.subscribe(data => { this.history = data as History; });

    this.house.subject.subscribe(data => {
      let state = data as HouseState;
      this.times = state.times;
      this.therm = state.thermostat;
      this.homeIcon = `assets/img/${data.thermostat.away ? 'homezzz' : 'home'}.png`;
      this.times.sunrise = this.times && this.times.sunrise ? this.times.sunrise.replace(/^.*, /, '') : '';
      this.times.sunset = this.times && this.times.sunset ? this.times.sunset.replace(/^.*, /, '') : '';
    });
  }

}
