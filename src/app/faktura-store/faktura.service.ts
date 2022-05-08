import { Injectable } from '@angular/core';
import { Faktura } from '../Models/faktura.model';
import { Sprzedawca } from '../Models/sprzedawca.model';
import { SellersService } from '../sellers/sellers.service';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class FakturService {
  private selectedFilter: number = 1
  showFakture = false;
  openAddFakture = false;
  private fakturesUpdate = new Subject<Faktura[]>();
  showenFakture!: Faktura;


  constructor(
    private sellersService: SellersService
  ) { }

  getFakturesUpdateListener(){
    return this.fakturesUpdate.asObservable()
  }


  addFakture(date: Date, numer: number, sprzedawca: string, kwota: number){
    const faktura: Faktura =  {
      date: date,
      numer: numer, 
      sprzedawca: this.sellersService.getSellerInfo(sprzedawca)!, 
      kwota: kwota
    }


    let faktury: Array<Faktura> = [] 

    if(localStorage.getItem("Faktury")){
      faktury = JSON.parse(localStorage.getItem("Faktury")!)
    }

    faktury.push(faktura)
    localStorage.setItem("Faktury", JSON.stringify(faktury))

    this.getFilterData(this.selectedFilter, 'Admin')
  }


  openAddFaktureDialog(){
    this.openAddFakture = !this.openAddFakture
  }

  getFilterData(id: number, role: string){
    const faktures: Faktura[] = JSON.parse(localStorage.getItem("Faktury")!)
    const filteredFaktures: Faktura[] = []
    this.selectedFilter = id
    if(id != 1){
      for( let object of faktures){
        if( object.sprzedawca.id == id){
          filteredFaktures.push(object)
        }
    }
    }else{
      for( let object of faktures){
        filteredFaktures.push(object)
      }
    }

    if(role == 'Admin'){
      this.fakturesUpdate.next(filteredFaktures)
    }else{
      this.getFiltredByDate(filteredFaktures)
    }

  }
  
  openShowToggle(){
    this.showFakture = !this.showFakture
  }

  unqueFaktureCheck(numer: number){
    const faktures: Faktura[] = JSON.parse(localStorage.getItem("Faktury")!)
    if(faktures){
      for(let object of faktures){
        if(object.numer == numer){
          return 'error'
        }
      }
    }
    return null
  }


  getFiltredByDate(faktures: Faktura[]){
    const filteredFaktures: Faktura[] = []
    for(let object of faktures){
      const date:Date = new Date(object.date)
      const nowDate: Date = new Date()
      if(nowDate > date){
        filteredFaktures.push(object)
      }
    }
    this.fakturesUpdate.next(filteredFaktures)

  }


}
