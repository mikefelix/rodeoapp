export class Current {
  cond: string = 'blank';
  temp: number;
  hum: number;
  night: boolean;
  recordedAt: string;

  constructor(){
  }

  image(){
    return `http://mozzarelly.com/weathericons/${this.cond}.png`;
  }
}

