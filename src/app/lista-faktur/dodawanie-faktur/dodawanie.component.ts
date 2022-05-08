import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FakturService } from '../../faktura-store/faktura.service';
import { Sprzedawca } from '../../Models/sprzedawca.model';
import { SellersService } from '../../sellers/sellers.service';

@Component({
  selector: 'app-dodawanie',
  templateUrl: './dodawanie.component.html',
  styleUrls: ['./dodawanie.component.scss']
})
export class DodawanieComponent implements OnInit {

  selectedSeller?: string;
  selectedSellerInfo!: Sprzedawca;
  sprzedawcy!: Sprzedawca[];
  addForm!: FormGroup
  uniqueError = false

  constructor(
    public fakturaStore: FakturService,
    private sellersService: SellersService
  ) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      date: new FormControl ("", [Validators.required]),
      numer: new FormControl ("", [Validators.required, Validators.minLength(4)]),
      sprzedawca: new FormControl ("", Validators.required),
      kwota: new FormControl ("", Validators.required),
    })

    this.sprzedawcy = this.sellersService.getSellers()

  }

  onAddFakture(){
    if(this.fakturaStore.unqueFaktureCheck(this.addForm.controls.numer.value)){
      this.uniqueError = true
    }else{
      
      this.fakturaStore.addFakture(
        this.addForm.controls.date.value, 
        this.addForm.controls.numer.value, 
        this.addForm.controls.sprzedawca.value, 
        this.addForm.controls.kwota.value
      )
      this.onReset()

    }
  }

  onReset(){
    this.addForm.reset()
    this.fakturaStore.openAddFaktureDialog()

  }

  onSelector(seller: string){
    this.selectedSellerInfo = this.sellersService.getSellerInfo(seller)!
    
  }

}
