import { Component } from '@angular/core';
import { AlertController, IonicPage } from 'ionic-angular';
import { ThermProvider } from '../../providers/therm';
import { BeerProvider } from '../../providers/beer';
import { Beer } from '../../models/Beer';
import { RodeoPage } from '../rodeoPage';

@IonicPage()
@Component({
  selector: 'page-beer',
  templateUrl: 'beer.html'
})
export class BeerPage extends RodeoPage<Beer> {
  pageName = "Beer";
  newSetting: string;
  drift: boolean;

  constructor(public provider: BeerProvider, public thermProvider: ThermProvider, public alertCtrl: AlertController) {
    super(provider, thermProvider);
  }

  onInit(){
    if (!this.data) return;
    if (this.data.mode.match(/Beer/))
      this.segment = "beer";
    else if (this.data.mode.match(/Fridge/))
      this.segment = "fridge";
  }

  onRefresh(){
    if (this.data.mode.match(/Beer/i))
      this.newSetting = this.data.beerSetting;
    else if (this.data.mode.match(/Fridge/i))
      this.newSetting = this.data.fridgeSetting;
  }

  fullMode(){
    console.log('Mode is ' + this.data.mode)
    if (this.data.mode.match(/Beer/i))
      return `${this.data.mode} (${this.data.beerSetting})`;
    else if (this.data.mode.match(/Fridge/i))
      return `${this.data.mode} (${this.data.fridgeSetting})`;
    else
      return this.data.mode;
  }
  
  setBeer(){
    this.provider.set('beer', this.newSetting, this.drift);
  }

  setFridge(){
    this.provider.set('fridge', this.newSetting, this.drift);
  }

}
