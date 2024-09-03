import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Random2Service } from '../services/random2.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule],
  exports: [HomeComponent],
  providers: [Random2Service],
})
export class HomeModule {}
