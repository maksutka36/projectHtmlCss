import { Component, OnInit} from '@angular/core';
import { SellersService } from './sellers/sellers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TestRekrutacyjny';

  constructor(
  private sellersService: SellersService){}

  ngOnInit(): void {
    this.sellersService.getStart()
  }

}
