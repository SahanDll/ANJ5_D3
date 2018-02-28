import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class ForceDirectedDataService {
  sensors = [];
  families = ['Temperature', 'Luminosity', 'Noise', 'Humidity', 'Dust', 'User'];
  maxSensors = 30;

  createSensors = (num: number) => {
    const max = Math.floor(Math.random() * num);
    // create sensors
    const results = [];
    for (let i = 0; i < max; i++) {
      const result = {
        id: i,
        /*familyType: this.families[Math.floor(Math.random() * this.families.length)],*/
        familyType: this.families[5] + ' ' + i,
        address: '192.168.0.1',
        name: 'MAN - ' + i,
        vendor: 'Sentinel',
        model: 'User',
        protocol: 'Connect ' + i
      };
      results.push(result);
    }
    return results;
  }
}
