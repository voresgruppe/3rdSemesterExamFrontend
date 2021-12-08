import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hairstyle } from '../../../shared/hairstyle.model';
import { HairstyleService } from '../../../shared/hairstyle.service';
import {Employee} from "../../../shared/employee.model";

@Component({
  selector: 'app-hairstyles',
  templateUrl: './hairstyles.component.html',
  styleUrls: ['./hairstyles.component.css']
})
export class HairstylesComponent implements OnInit {

  $chosenHairstyle: Hairstyle | undefined;

  $possibleHairstyles: Hairstyle[] | undefined;

  $hairstyles: Observable<Hairstyle[]> | undefined

  constructor(private _service: HairstyleService) { }

  ngOnInit(): void {
    this.$hairstyles = this._service.getHairstyles()
  }


  //TODO af en eller anden grund skal man trykke 2 gange på knappen
  ChooseHairstyle(id: Number) {
    this._service.getHairstyle(id).subscribe(h=>this.$chosenHairstyle =h)
    if(this.$chosenHairstyle){
      this._service.getHairstyleFromListOfId(this.$chosenHairstyle.possibleStyles).subscribe(h=> this.$possibleHairstyles = h);
    }
  }
}
