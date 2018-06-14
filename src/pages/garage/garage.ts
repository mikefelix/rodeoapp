import { Component, OnInit } from '@angular/core';
import { HouseState } from "../../models/HouseState";
import { House } from "../../providers/house";
import { AlertController, IonicPage } from 'ionic-angular';
import { Garage } from '../../models/Garage';
import { Times } from '../../models/Times';
import { GarageDoor } from '../../providers/garagedoor';
import { Therm } from '../../providers/therm';

@IonicPage()
@Component({
  selector: 'page-garage',
  templateUrl: 'garage.html'
})
export class GaragePage implements OnInit {
  garage = new Garage();
  loading: boolean;
  errorMessage: string;
  openMins = 5;
  homeIcon: string;

  private snapUrl = 'https://mozzarelly.com/snap?user=mozzarelly&pwd=4h1K4o7pPoZ2&rnd=' + (new Date().getTime());

  constructor(public garageDoor: GarageDoor, public therm: Therm, public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.garageDoor.subject.subscribe(garage => {
      this.garage = garage;
      this.loading = false;
    });

    this.therm.subject.subscribe(therm => `assets/img/${therm.away ? 'homezzz' : 'home'}.png`);
  }

  refreshStyle(){
    return {
      opacity: this.loading ? '0.4' : ''
    }
  }

  openGarage(time) {
    this.loading = true;
    console.log('open for ' + this.openMins)
    this.garageDoor.openGarage(this.openMins);
    this.garage.is_open = true;
    setTimeout(this.garageDoor.refresh.bind(this.garage), 15000);
  }

  closeGarage() {
    this.loading = true;
    this.garageDoor.closeGarage();
    this.garage.is_open = false;
    setTimeout(this.garageDoor.refresh.bind(this.garage), 3000);
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
    if (!this.garage || this.garage.is_open === undefined) {
      return 'Connecting...';
    }
    else {
      let text = 'The garage is ' + (this.garage.is_open ? 'open' : 'closed') + '.';
      if (this.garage.next_close_time && this.garage.current_time){
        let timeUntilClose = Math.floor((new Date(this.garage.next_close_time).getTime() - new Date(this.garage.current_time).getTime()) / 1000);
        text += ' Closing in ' + timeUntilClose + ' seconds.';
      }

      return text;
    }
  }

  isOpen(){
    return this.garage && this.garage.is_open;
  }

  info(){
    let times = `<b>Last opened</b><br/>${this.formatTime(this.garage.last_open_time)}<br/>
                 <b>Last closed</b><br/>${this.formatTime(this.garage.last_close_time)}<br/>`;
                 
    if (this.garage.next_close_time)
      times += `<b>Next close</b>${this.formatTime(this.garage.next_close_time)}<br/>`;

    let alert = this.alertCtrl.create({
      title: 'Garage',
      subTitle: times,
      buttons: ['OK']
    });

    alert.present();
  }

  formatTime(time){
    /*var date = ('' + new Date(time)).replace(/ ?GMT-.... \(...\) ?/,'am')
      .replace(/(\w{3} \w{3} \d{2}) \d{4}/, '$1,')
      .replace(/13:(..:..)am/, "1:$1pm")
      .replace(/14:(..:..)am/, "2:$1pm")
      .replace(/15:(..:..)am/, "3:$1pm")
      .replace(/16:(..:..)am/, "4:$1pm")
      .replace(/17:(..:..)am/, "5:$1pm")
      .replace(/18:(..:..)am/, "6:$1pm")
      .replace(/19:(..:..)am/, "7:$1pm")
      .replace(/20:(..:..)am/, "8:$1pm")
      .replace(/21:(..:..)am/, "9:$1pm")
      .replace(/22:(..:..)am/, "10:$1pm")
      .replace(/23:(..:..)am/, "11:$1pm")
      .replace(/00:(..:..)am/, "12:$1am");
    return date;*/
    return time;
  }

  refreshSnapUrl(){
    this.snapUrl = this.snapUrl.replace(/rnd=.+/, 'rnd=' + (new Date().getTime()));
  }

  refreshState(){
    this.refreshSnapUrl();
    this.garageDoor.refresh();
  }
}
