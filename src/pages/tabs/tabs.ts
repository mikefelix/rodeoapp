import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { GarageProvider } from '../../providers/garage';
import { DevicesProvider } from '../../providers/devices';
import { CurrentWeatherProvider } from '../../providers/current';
import { AlarmProvider } from '../../providers/alarm';
import { BeerProvider } from '../../providers/beer';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = 'DevicesPage';
  tab2Root: any = 'GaragePage';
  tab3Root: any = 'WeatherPage';
  tab4Root: any = 'AlarmPage';
  tab5Root: any = 'BeerPage';
  tab6Root: any = 'HistoryPage';

  providers = {};

  constructor(
    public devices: DevicesProvider, 
    public garage: GarageProvider,
    public weather: CurrentWeatherProvider, 
    public alarm: AlarmProvider, 
    public beer: BeerProvider 
    ) {
      this.providers = { devices, garage, weather, alarm, beer };
  }

  changeTab(name){
    console.log(`Activating tab ${name}`);
    this.providers[name].refresh();
  }
}
