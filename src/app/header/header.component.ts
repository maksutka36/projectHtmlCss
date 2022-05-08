import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../account/account.service';
import { FakturService } from '../faktura-store/faktura.service';
import { SellersService } from '../sellers/sellers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private accountStatusSub!: Subscription
  role!: string

  constructor(
    private route: Router,
    public accountService: AccountService,
    public sellersService: SellersService
  ) { }

  ngOnInit(): void {
    this.accountStatusSub = this.accountService.accountUpdateListener()
      .subscribe((role: string) =>{
        this.role = role
      })
    this.accountService.autoAuth()
  }

  onAccount(){
    this.accountService.accountScreenToggle()
  }

  onSurf(navigate: string){
    this.route.navigate([navigate])
  }

  ngOnDestroy(): void {
    this.accountStatusSub.unsubscribe()
  }
}
