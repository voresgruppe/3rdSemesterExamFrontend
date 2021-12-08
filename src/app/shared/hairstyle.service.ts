import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hairstyle } from './hairstyle.model';

@Injectable({
  providedIn: 'root'
})
export class HairstyleService {

  constructor(private _http : HttpClient) { }

  getHairstyles(): Observable<Hairstyle[]>{
    return this._http.get<Hairstyle[]>(`${environment.api}/HairStyle`)
  }

  getHairstyle(id: Number){
    return this._http.get<Hairstyle>(`${environment.api}/HairStyle/${id}`)
  }

  getHairstyleFromListOfId(possibleStyles: number[]){
    return this._http.post<Hairstyle[]>(`${environment.api}/HairStyle/GetListOfHairstyles_FromListOfId`, possibleStyles)
  }

}
