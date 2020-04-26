import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { TableFilterPipe } from '../table-filter.pipe';

@Component({
  selector: 'app-games-dashboard',
  templateUrl: './games-dashboard.component.html',
  styleUrls: ['./games-dashboard.component.css']
})
export class GamesDashboardComponent implements OnInit {
  data = [];
  columnDef = [];
  titles = [];
  search;
  original;
  constructor(private _gameService: GameServiceService,private _pipe:TableFilterPipe) { }

  ngOnInit() {
    this.getGamesData();
    this.getColumnDef();
  }

  getGamesData = () => {
    this._gameService.getData().subscribe(res => {
      this.original = res;
      this.data = res;
      this.original.forEach((ele)=> this.titles.push(ele['title']));
    });
  }

  getColumnDef=()=>{
    this.columnDef = [
      {prop:'title',displayName:'Title',width:30},
      {prop:'platform',displayName:'Platform',width:10},
      {prop:'score',displayName:'Score',width:10},
      {prop:'genre',displayName:'Genre',width:10},
      {prop:'editors_choice',displayName:'Editors Choice',width:10},
      {prop:'release_year',displayName:'Release Year',width:10}
    ];
  }

  getSelectedData = (e)=>{
    this.data = this._pipe.transform(this.original,e,'title');
  }

  reset=()=>{
    this.search='';
    this.getGamesData();
  }

}