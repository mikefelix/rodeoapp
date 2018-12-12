import { OnInit } from '@angular/core';
import { ThermProvider } from '../providers/therm';
import { Provider } from '../providers/provider';

export abstract class RodeoPage<T> implements OnInit {
  abstract pageName: string;

  loading = true;
  loaded = false; // initial load
  homeIcon: string;
  errorMessage: string;
  data: T;
  segment: string

  constructor(public provider: Provider<T>, public thermProvider: ThermProvider){
  }
  
  abstract onInit();
  
  ngOnInit() {
    this.provider.subject.subscribe(data => {
      console.log(`Page got new data for ${this.pageName}: ${JSON.stringify(data)}`);
      if (data){
        this.data = data;
        this.onRefresh();

        this.loading = false;
        this.loaded = true;
        console.log(`${this.pageName} is done loading.`);
      }
    });
    
    this.thermProvider.subject.subscribe(therm => {
        this.homeIcon = `assets/img/${therm && therm.away ? 'homezzz' : 'home'}.png`;
    });

    this.thermProvider.refresh();
    this.onInit();
  }

  canDisplay(){
    // if (!this.loaded) console.log(`${this.pageName} not displaying because not first loaded.`);
    // if (this.loading) console.log(`${this.pageName} not displaying because still loading.`);
    return this.loaded && !this.loading;
  }
  
  // ionSelected(){
  //   console.log(`refresh for ionSelected`)
  //   this.refreshState();
  // }

  refreshStyle(){
    return {
      opacity: this.loading ? '0.4' : ''
    }
  }
  
  refreshState(after = null){
    if (after){
      setTimeout(this.refreshState.bind(this), after * 1000);
    }
    else {
      this.loading = true;
      this.provider.refresh();
      this.thermProvider.refresh();
    }
  }
  
  abstract onRefresh();

  cap(name: String){
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }
  
}