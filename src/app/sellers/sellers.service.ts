import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sprzedawca } from '../Models/sprzedawca.model';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  $sellersUpdate = new Subject<Sprzedawca[]>()
  seller!: Sprzedawca
  showSellerEditor = false
  editedSellers: Sprzedawca[] = []
  constructor() { }


   getSellers(){
     return JSON.parse(localStorage.getItem("Sprzedawcy")!)
   }

   getSellersList(){
     const sellers = JSON.parse(localStorage.getItem("Sprzedawcy")!)
      this.$sellersUpdate.next(sellers)
   }

   getSellersUpdateListener(){
    return this.$sellersUpdate.asObservable()
   }
 
   getSellerInfo(seller: string){
     const store: Array<Sprzedawca> = JSON.parse(localStorage.getItem("Sprzedawcy")!)
     for(let object of store){
       if(object.nazwa == seller){
         return object
       }
     }
     return null
   }

   showSellerInfo(seller: Sprzedawca){
     this.seller = seller
   }

   openSellerEditor(seller: Sprzedawca){
    this.seller = seller
    this.showEditorToggle()
   }

   showEditorToggle(){
     this.showSellerEditor = !this.showSellerEditor
   }

   editSeller(seller: Sprzedawca){
    const sellers: Sprzedawca[] = JSON.parse(localStorage.getItem("Sprzedawcy")!)
    for(let object of sellers){
      if(object.id == seller.id){
        object.nazwa = seller.nazwa
        object.adres = seller.adres
      }
      this.editedSellers.push(object)
    }
    localStorage.setItem("Sprzedawcy", JSON.stringify(this.editedSellers))
    this.$sellersUpdate.next(this.editedSellers)
    this.editedSellers = []
   }


}
