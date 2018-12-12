import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage } from 'ionic-angular';
import { Garage } from '../../models/Garage';
import { GarageProvider } from '../../providers/garage';
import { ThermProvider } from '../../providers/therm';
import { RodeoPage } from '../rodeoPage';

@IonicPage()
@Component({
  selector: 'page-garage',
  templateUrl: 'garage.html'
})
export class GaragePage extends RodeoPage<Garage> {
  pageName = "Garage";
  openMins = 5;

  snapUrl = 'https://mozzarelly.com/video?user=mozzarelly&pwd=4h1K4o7pPoZ2&rnd=' + (new Date().getTime());

  constructor(public provider: GarageProvider, public thermProvider: ThermProvider, public alertCtrl: AlertController) {
    super(provider, thermProvider);
  }

  onInit(){}

  onRefresh() {}

  openGarage() {
    this.provider.openGarage(this.openMins);
  }

  closeGarage() {
    this.provider.closeGarage();
  }

  online() {
    return this.data && this.data.is_open !== undefined;
  }

  openForText(){
    if (!this.openMins || this.openMins > 30)
      return 'Open indefinitely';
    else if (this.openMins == 1)
      return `Open for 1 minute`;
    else
      return `Open for ${this.openMins} minutes`;
  }

  stateText(){
    if (!this.online){
      return 'The garage is offline.';
    }
    else if (!this.data || this.data.is_open === undefined) {
      return 'Connecting...';
    }
    else {
      let text = 'The garage is ' + (this.data.is_open ? 'open' : 'closed') + '.';
/*      if (this.data.next_close_time && this.data.current_time){
        let nextClose = new Date(this.data.next_close_time).getTime();
        let current = new Date(this.data.current_time).getTime();
        let timeUntilClose = Math.floor(nextClose - current) / 1000;
        text += ' Closing in ' + timeUntilClose + ' seconds.';
      }
*/
      if (this.data.next_close_time){
        let time = this.data.next_close_time.replace(/"/, '').replace(/^.*, /, '');
        text += ` Closing at ${time}.`;
      }

      return text;
    }
  }

  isOpen(){
    return this.data && this.data.is_open;
  }

  info(){
    if (!this.data) return "";

    let times = `<b>Last opened</b><br/>${this.formatTime(this.data.last_open_time)}<br/>
                 <b>Last closed</b><br/>${this.formatTime(this.data.last_close_time)}<br/>`;
                 
    if (this.data.next_close_time)
      times += `<b>Next close</b>${this.formatTime(this.data.next_close_time)}<br/>`;

    let alert = this.alertCtrl.create({
      title: 'Garage',
      subTitle: times,
      buttons: ['OK']
    });

    alert.present();
  }

  formatTime(time){
    return time;
  }

}
