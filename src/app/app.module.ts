import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { RandomService } from './services/random.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule, AboutModule],
  providers: [RandomService],
  bootstrap: [AppComponent],
})
export class AppModule {}
