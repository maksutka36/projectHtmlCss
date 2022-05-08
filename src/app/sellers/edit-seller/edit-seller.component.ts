import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sprzedawca } from 'src/app/Models/sprzedawca.model';
import { SellersService } from '../sellers.service';

@Component({
  selector: 'app-edit-seller',
  templateUrl: './edit-seller.component.html',
  styleUrls: ['./edit-seller.component.scss']
})
export class EditSellerComponent implements OnInit {


  selectedSeller!: Sprzedawca
  editForm!: FormGroup

  constructor(
    private sellersSerivce: SellersService,
  ) { }

  ngOnInit(): void {
    this.selectedSeller = this.sellersSerivce.seller;
    this.editForm = new FormGroup({
      id: new FormControl (`${this.selectedSeller.id}`),
      name: new FormControl (`${this.selectedSeller.nazwa}`, [Validators.required, Validators.minLength(4)]),
      adres: new FormControl (`${this.selectedSeller.adres}`, Validators.required)
    })
  }

  closeEditScreen(){
    this.sellersSerivce.showEditorToggle()
  }

  onEdit(){
    const seller: Sprzedawca = {
      id: this.editForm.controls.id.value,
      nazwa: this.editForm.controls.name.value,
      adres: this.editForm.controls.adres.value
    }
    this.sellersSerivce.editSeller(seller)
  }

}
