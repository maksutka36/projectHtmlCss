import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './meterial-module/angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListaFakturComponent } from './lista-faktur/lista-faktur.component';
import { DodawanieComponent } from './lista-faktur/dodawanie-faktur/dodawanie.component';
import { PrzegladComponent } from './przeglad/przeglad.component';
import { AccountComponent } from './account/account.component';
import { SellersComponent } from './sellers/sellers.component';
import { EditSellerComponent } from './sellers/edit-seller/edit-seller.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaFakturComponent,
    DodawanieComponent,
    PrzegladComponent,
    AccountComponent,
    SellersComponent,
    EditSellerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
