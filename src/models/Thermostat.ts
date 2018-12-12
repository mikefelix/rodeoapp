export class Thermostat {
    away: boolean;
    temp: number = 0;
    humidity: number;
    state: string = "";
    mode: string = "";
    on: boolean;
    target: number = 0;

    constructor(){  
    }

}
