import { Injectable } from '@angular/core';

@Injectable()
export class Random2Service {
  value: number = Math.random();
  label: string;
  constructor() {
    this.label = 'Random2 value ' + this.value.toFixed(4);
  }
}
