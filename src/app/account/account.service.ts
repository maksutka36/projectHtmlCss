import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  chosenRole = 'Guest'
  accountScreen = false;
  roles = ["Admin","User","Guest"]
  private $statusAccount = new Subject<string>()

  constructor() { }

  accountScreenToggle(){
    this.accountScreen = !this.accountScreen
  }

  saveRole(role: string){
    this.$statusAccount.next(role)
    localStorage.setItem("UserRole", role)
    this.accountScreenToggle()
  }

  autoAuth(){
    const setRole = localStorage.getItem("UserRole")!
    if(!setRole){
      localStorage.setItem("UserRole", 'Guest')
    }

    this.chosenRole = localStorage.getItem("UserRole")!
    this.$statusAccount.next(this.chosenRole)
  }

  accountUpdateListener(){
    return this.$statusAccount.asObservable()
  }
}
