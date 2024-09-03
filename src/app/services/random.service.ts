import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {
  value: number = Math.random();
  label: string;
  constructor() {
    this.label = 'Random value ' + this.value.toFixed(4);
  }
}
