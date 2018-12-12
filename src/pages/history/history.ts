import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Provider } from '../../providers/provider';
import { ThermProvider } from '../../providers/therm';
import { HistoryProvider } from '../../providers/history';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  history: {};
  errorMessage: string;
  loaded = false;
  homeIcon: string;

  constructor(private provider: HistoryProvider, private therm: ThermProvider) {
  }

  historyText(){
    JSON.stringify(this.history);
  }

}
