import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = 'LightsPage';
  tab2Root: any = 'GaragePage';
  tab3Root: any = 'WeatherPage';
  tab4Root: any = 'HistoryPage';

  constructor(public navCtrl: NavController) {
  }
}
