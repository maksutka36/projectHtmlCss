import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FakturService } from '../faktura-store/faktura.service';
import { Sprzedawca } from '../Models/sprzedawca.model';
import { SellersService } from './sellers.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})
export class SellersComponent implements OnInit, OnDestroy {

  sellersList: Sprzedawca[] = [];
  private sellersSub!: Subscription

  constructor(
    public sellersService: SellersService,
    public fakturaStore: FakturService
  ) { }

  ngOnInit(): void {
    this.sellersSub = this.sellersService.getSellersUpdateListener()
      .subscribe((sellers: Sprzedawca[]) => {
        this.sellersList = sellers
      })
    this.sellersService.getSellersList()
  }

  openSellerInfo(seller: Sprzedawca){
    this.fakturaStore.openShowToggle()
    this.sellersService.showSellerInfo(seller)
  }

  openSellerEditor(seller: Sprzedawca){
    this.sellersService.openSellerEditor(seller)
    
  }

  ngOnDestroy(): void {
    this.sellersSub.unsubscribe()
  }

}
