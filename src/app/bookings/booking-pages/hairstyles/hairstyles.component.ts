import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hairstyle } from '../../shared/hairstyle.model';
import { HairstyleService } from '../../shared/hairstyle.service';

@Component({
  selector: 'app-hairstyles',
  templateUrl: './hairstyles.component.html',
  styleUrls: ['./hairstyles.component.css']
})
export class HairstylesComponent implements OnInit {

  $hairstyles: Observable<Hairstyle[]> | undefined

  constructor(private _service: HairstyleService) { }

  ngOnInit(): void {
    this.$hairstyles = this._service.getHairstyles()
  }

}
