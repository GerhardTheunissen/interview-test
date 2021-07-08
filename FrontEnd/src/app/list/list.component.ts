import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {ApiService} from '../api.service';
import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';


class Hero{
  name:string;
  power:string;
  stats:{
    key:string,
    value:string}
  }

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private heroData:ApiService){}
  stopReceivingData: Subject<boolean> = new  Subject();
  hero:Hero;
  evolveLabeltxt:string;
  dataFromService:Hero[];
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'power','strength','intelligence','stamina','evolveBtn'];

  ngOnInit() {
    //display heroes on screen
    this.heroData.getHeroes().pipe(
      takeUntil(this.stopReceivingData),
    ).subscribe(result => {
       this.dataFromService = result;
    });
  }

  evolveHero(name)
  {
    //button to evolve the hero and display
      this.heroData.evolveHero(name).subscribe((result)=>{
      this.hero=result;
      //build the string yo display on our label above the grid
      this.evolveLabeltxt = this.hero.name + " updated with stats ";

      for (let key in this.hero.stats) {
        let value = this.hero.stats[key];
        this.evolveLabeltxt = this.evolveLabeltxt + " " + value.key + " : " + value.value;
      }
      document.getElementById("evolveUpdateLabel").innerHTML = this.evolveLabeltxt;
    })

  }
}
