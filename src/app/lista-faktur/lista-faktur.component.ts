import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../account/account.service';
import { FakturService } from '../faktura-store/faktura.service';
import { Faktura } from '../Models/faktura.model';
import { Sprzedawca } from '../Models/sprzedawca.model';
import { SellersService } from '../sellers/sellers.service';

@Component({
  selector: 'app-lista-faktur',
  templateUrl: './lista-faktur.component.html',
  styleUrls: ['./lista-faktur.component.scss']
})
export class ListaFakturComponent implements OnInit, OnDestroy {

  role!: string;
  filterSellers!: string;
  groupSellers!: Sprzedawca[]
  listaFaktur: Faktura[] = [];
  private fakturesSub!: Subscription
  private roleSub!: Subscription

  constructor(
    public fakturaStore: FakturService,
    public accountService: AccountService,
    private sellersService: SellersService
  ) { }

  ngOnInit(): void {
    this.fakturesSub = this.fakturaStore.getFakturesUpdateListener()
      .subscribe((faktures: Faktura[]) =>{
      this.listaFaktur = faktures
    })
    this.groupSellers = this.sellersService.getSellers()

    this.roleSub = this.accountService.accountUpdateListener()
      .subscribe((role: string) => {
        this.role = role
        this.fakturaStore.getFilterData(1, role)
      })
    this.accountService.autoAuth()
  }

  ngOnDestroy(): void {
    this.fakturesSub.unsubscribe();
    this.roleSub.unsubscribe()
  }

  onSelectFilter(id: number){
    this.fakturaStore.getFilterData(id, this.role)
  }

  onShowFaktureInfo(faktura: Faktura){
    this.fakturaStore.showenFakture = faktura
    this.fakturaStore.openShowToggle()
  }


}
