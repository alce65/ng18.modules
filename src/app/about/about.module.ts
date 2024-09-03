import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { Random2Service } from '../services/random2.service';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule],
  exports: [AboutComponent],
  providers: [Random2Service],
})
export class AboutModule {}
