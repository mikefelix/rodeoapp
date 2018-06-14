import { Garage } from "./Garage";
import { Thermostat } from "./Thermostat";
import { Bulbs } from "./Bulbs";
import { Times } from "./Times";

export class HouseState {
  garage: Garage;
  bulbs: Bulbs;
  times: Times;
  schedules: {};
  thermostat: Thermostat;
  history: {};

  constructor(){
    this.garage = new Garage();
    this.bulbs = new Bulbs();
    this.times = new Times();
    this.thermostat = new Thermostat();
    this.schedules = {};
    this.history = {};
  }

}
