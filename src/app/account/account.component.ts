import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  roles!: string[]

  constructor(
    public accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.roles = this.accountService.roles
  }

  onChooseRole(role: string){
    this.accountService.saveRole(role)
    this.router.navigate([''])

  }

  colse(){
    this.accountService.accountScreenToggle()
  }

  

}
