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

  $starterStyles: Hairstyle[] | undefined

  constructor(private _hairstyleService: HairstyleService) { }

  ngOnInit(): void {
    this.$hairstyles = this._hairstyleService.getHairstyles()
    this._hairstyleService.getHairStyles_StarterStyles().subscribe(h=> this.$starterStyles= h as Hairstyle[])
  }



  async ChooseHairstyle(id: Number) {
    this._hairstyleService.getHairstyle(id).subscribe(h => this.$chosenHairstyle = h)

    //sørger for man ikke skal trykke "choose" 2 gange
    await new Promise(f=> setTimeout(f, 100))

    if (this.$chosenHairstyle) {
      this._hairstyleService.getHairstyleFromListOfId(this.$chosenHairstyle.possibleStyles).subscribe(h => this.$possibleHairstyles = h);
    }
  }

  CancelChosenHairstyle() {
    this.$chosenHairstyle = undefined;
  }
}
