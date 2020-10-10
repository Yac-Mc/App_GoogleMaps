import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Sockets
import { SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { MapGoogleComponent } from './components/map-google/map-google.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MapGoogleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(environment.sokectConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
