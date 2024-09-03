import { Component } from '@angular/core';
import { RandomService } from '../services/random.service';
import { Random2Service } from '../services/random2.service';

@Component({
  selector: 'app-about',
  template: `
    <h2>About</h2>
    <p>
      {{ random.label }}
    </p>
    <p>
      {{ random2.label }}
    </p>
  `,
  styles: ``,
})
export class AboutComponent {
  constructor(
    protected random: RandomService,
    protected random2: Random2Service
  ) {}
}
