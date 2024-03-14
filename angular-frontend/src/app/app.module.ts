import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // import http client module for fetching datas
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    // for injecting ProductServices to other modules
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
