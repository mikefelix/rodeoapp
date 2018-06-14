export class Forecast {

  title: string;
  temp: number;
  hum: number;
  cond: string;
  cast: string;
  night: boolean;
  recordedAt: string;

  constructor(){
  }

  image(){
    return `http://mozzarelly.com/weathericons/${this.cond}.png`;
  }

  dir(){
    return this.night ? "↓" : "↑";
  }
}

