import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DodawanieComponent } from './lista-faktur/dodawanie-faktur/dodawanie.component';
import { ListaFakturComponent } from './lista-faktur/lista-faktur.component';
import { SellersComponent } from './sellers/sellers.component';

const routes: Routes = [
  { path : '', component: ListaFakturComponent},
  { path : 'sellers', component: SellersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
