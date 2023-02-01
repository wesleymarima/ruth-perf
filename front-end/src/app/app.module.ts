import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MaterialModule} from "./modules/material/material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoaderInterceptor} from "./modules/shared/interceptors/loader.interceptor";
import {SharedModule} from "./modules/shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StocksModule} from "./modules/stocks/stocks.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    StocksModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
