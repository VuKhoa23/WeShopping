import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Route, RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

const routes: Routes = [
  { path: "category/:id", component: ProductListComponent },
  { path: "category", component: ProductListComponent },
  { path: "products", component: ProductListComponent },
  { path: "", redirectTo: "/products", pathMatch: 'full' },
  { path: "**", redirectTo: "/products", pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // import http client module for fetching datas
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    provideClientHydration(),
    // for injecting ProductServices to other modules
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
