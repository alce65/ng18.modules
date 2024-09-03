import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './lazy.component';
import { LazyRoutingModule } from './lazy-routing.module';
import { Random2Service } from '../services/random2.service';

@NgModule({
  declarations: [LazyComponent],
  imports: [CommonModule, LazyRoutingModule],
  providers: [Random2Service],
})
export class LazyModule {}
