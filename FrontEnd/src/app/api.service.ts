import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'

export interface Hero{
  name:string,
  power:string,
  stats:{
    key:string,
    value:string
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url='http://localhost:4201/api/heroes'
  constructor(private http:HttpClient) { }
  getHeroes()
  {
    return this.http.get<Hero[]>(this.url);
  }

  evolveHero(name:string)
  {
    return this.http.post<Hero>(this.url,{
      Name:name,
      Action:1
    });
  }
}
