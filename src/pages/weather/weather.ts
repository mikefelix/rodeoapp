import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Current } from "../../models/Current";
import { Forecast } from "../../models/Forecast";
import { History } from "../../models/History";
import { Times } from '../../models/Times';
import { Thermostat } from '../../models/Thermostat';
import { ThermProvider } from '../../providers/therm';
import { TimesProvider } from '../../providers/times';
import { RodeoPage } from '../rodeoPage';
import { CurrentWeatherProvider } from '../../providers/current';
import { Forecast1Provider } from '../../providers/forecast1';
import { Forecast2Provider } from '../../providers/forecast2';
import { HistoricalWeatherProvider } from '../../providers/historical';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage extends RodeoPage<Current> {
  pageName = "Weather";
  segment = 'current';
  thermostat: Thermostat;// = new Thermostat();
  current: Current = new Current();
  forecast1: Forecast = new Forecast();
  forecast2: Forecast = new Forecast();
  history: History = new History();
  times: Times = new Times();

  constructor(public currentProvider: CurrentWeatherProvider, 
    public forecast1Provider: Forecast1Provider, 
    public forecast2Provider: Forecast2Provider, 
    public historicalProvider: HistoricalWeatherProvider,
    public thermProvider: ThermProvider, 
    public timesProvider: TimesProvider) {
      super(currentProvider, thermProvider);
  }

  canDisplay(){
    return super.canDisplay() && this.thermostat !== undefined;
  }

  image(cond: string){
    if (!cond) return '';
    return `https://mozzarelly.com/weathericons/${cond}.png`;
  }

  turnOnTherm(){
    this.thermProvider.turnOnTherm();
  }

  dir(forecast: Forecast){
    return forecast.night ? "↓" : "↑";
  }

  insideState(){
    if (!this.thermostat) return '';
    if (this.thermostat.mode == 'eco')
      return `⤑${this.thermostat.target}`; // ↛
    else if (this.thermostat.state == 'cooling')
      return `↓${this.thermostat.target}°`;
    else if (this.thermostat.state == 'heating')
      return `↑${this.thermostat.target}°`;
    else if (this.thermostat.state == 'fan')
      return `⭈${this.thermostat.target}°`; // ≈ ⭈ ⇝
    else
      return `→${this.thermostat.target}°`; 
  }

  sunTime(forecast: Forecast){
    if (!this.times || !this.times.times) {
      console.log(`no times`)
      return '';
    }

    if (forecast.night){
      return `Sunset at ${this.times.times.sunset}.`;
    }
    else {
      return `Sunrise at ${this.times.times.sunrise}.`;
    }
  }

  // refreshState(after = null){
  //   if (after){
  //     setTimeout(this.refreshState.bind(this), after * 1000);
  //   }
  //   else {
  //     this.loading = true;
  //     this.provider.refresh();
  //     this.forecast1Provider.refresh();
  //     this.forecast2Provider.refresh();
  //     this.historicalProvider.refresh();
  //     this.thermProvider.refresh();
  //   }
  // }

   onRefresh(){
    this.current = this.data;
    this.thermProvider.refresh();
    this.forecast1Provider.refresh();
    this.forecast2Provider.refresh();
    this.historicalProvider.refresh();
   }

  onInit() {
    // this.currentProvider.subject.subscribe(data => { this.current = data as Current; });
    this.thermProvider.subject.subscribe(data => { if (data) this.thermostat = data });
    this.forecast1Provider.subject.subscribe(data => { if (data) this.forecast1 = data as Forecast; });
    this.forecast2Provider.subject.subscribe(data => { if (data) this.forecast2 = data as Forecast; });
    this.historicalProvider.subject.subscribe(data => { if (data) this.history = data as History; });
    this.timesProvider.subject.subscribe(data => {
      if (this.data){
        this.times = data as Times;
        if (this.times && this.times.times){
          this.times.times.sunrise = this.times.times.sunrise ? this.times.times.sunrise.replace(/^.*, /, '') : '';
          this.times.times.sunset = this.times.times.sunset ? this.times.times.sunset.replace(/^.*, /, '') : '';
        }
      }
    });
  }

}
