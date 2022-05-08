import { Component, OnInit } from '@angular/core';
import { FakturService } from '../faktura-store/faktura.service';
import { Faktura } from '../Models/faktura.model';
import { Sprzedawca } from '../Models/sprzedawca.model';
import { SellersService } from '../sellers/sellers.service';

@Component({
  selector: 'app-przeglad',
  templateUrl: './przeglad.component.html',
  styleUrls: ['./przeglad.component.scss']
})
export class PrzegladComponent implements OnInit {


  faktura!: Faktura;
  seller!: Sprzedawca;

  constructor(
    private fakturaStore: FakturService,
    private sellersService: SellersService
  ) { }

  ngOnInit(): void {
    this.seller = this.sellersService.seller
    this.faktura = this.fakturaStore.showenFakture
  }

  showFakture(){
    this.fakturaStore.openShowToggle()
  }

}
