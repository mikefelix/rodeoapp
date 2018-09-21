import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Current } from "../../models/Current";
import { Forecast } from "../../models/Forecast";
import { History } from "../../models/History";
import { House } from '../../providers/house';
import { WeatherProvider } from '../../providers/weather';
import { Times } from '../../models/Times';
import { HouseState } from '../../models/HouseState';
import { Thermostat } from '../../models/Thermostat';
import { ThermProvider } from '../../providers/therm';
import { TimesProvider } from '../../providers/times';

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
  thermostat: Thermostat;
  times: Times = new Times();

  constructor(private weather: WeatherProvider, private therm: ThermProvider, private timing: TimesProvider) {
    let date = new Date();

    this.time = {
      ampm: (date.getHours() >= 12 ? 'pm' : 'am'),
      hour: (date.getHours() > 12 ? date.getHours() - 12 : (date.getHours() == 0 ? '12' : date.getHours())).toString(),
      minutes: date.getMinutes().toString().replace(/^(.)$/, '0$1')
    }
  }

  refreshState(){
    this.weather.refresh();
    this.therm.refresh();
  }

  image(cond: string){
    return `https://mozzarelly.com/weathericons/${cond}.png`;
  }

  turnOnTherm(){
    this.therm.turnOnTherm();
  }

  dir(forecast: Forecast){
    return forecast.night ? "↓" : "↑";
  }

  insideState(){
    if (this.thermostat.state == 'cooling')
      return `↓${this.thermostat.target}°`;
    else if (this.thermostat.state == 'heating')
      return `↑${this.thermostat.target}°`;
    else if (this.thermostat.state == 'fan')
      return `⭈${this.thermostat.target}°`; // ≈ ⭈ ⇝
    else
      return `→${this.thermostat.target}°`; 
  }

  loaded(){
    return this.current && this.forecast1 && this.forecast2;
  }

  sunTime(forecast: Forecast){
    if (forecast.night){
      return `Sunset at ${this.times.sunset}.`;
    }
    else {
      return `Sunrise at ${this.times.sunrise}.`;
    }
  }

  ngOnInit() {
    this.weather.currentSubject.subscribe(data => { this.current = data as Current; });
    this.weather.forecast1Subject.subscribe(data => { this.forecast1 = data as Forecast; });
    this.weather.forecast2Subject.subscribe(data => { this.forecast2 = data as Forecast; });
    this.weather.historySubject.subscribe(data => { this.history = data as History; });

    this.therm.subject.subscribe(data => {
      this.thermostat = data;
      this.homeIcon = `assets/img/${data.away ? 'homezzz' : 'home'}.png`;
    });

    this.timing.subject.subscribe(data => {
      this.times = data as Times;
      this.times.sunrise = this.times && this.times.sunrise ? this.times.sunrise.replace(/^.*, /, '') : '';
      this.times.sunset = this.times && this.times.sunset ? this.times.sunset.replace(/^.*, /, '') : '';
    });


  }

  ionSelected(){
    this.refreshState();
  }

}
