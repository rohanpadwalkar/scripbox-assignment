import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { StorageService } from './services/storage.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './component/alert/alert.component';
import { AlertService } from './component/alert/alert.service';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TimeagoModule.forRoot()
  ],
  providers: [StorageService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
