import { Component, OnInit, Input } from '@angular/core';
import { TableSortPipe } from "../table-sort.pipe";
@Component({
  selector: 'app-common-data-table',
  templateUrl: './common-data-table.component.html',
  styleUrls: ['./common-data-table.component.css']
})
export class CommonDataTableComponent implements OnInit {
  @Input("columnDef")  columnDef;
  @Input("height") height;
  dataSource = [];
  prop;
  orderBy = "asc";
  constructor(private _pipe:TableSortPipe) { }

  ngOnInit() {
  }

 @Input()
  set data(data: any) {
    this.dataSource = [...data];
  }
   doOrder = (prop: string) => {
    this.prop = prop;
    this.orderBy = this.orderBy == "asc" ? "desc" : "asc";
    this.dataSource = [
      ...this._pipe.transform(this.dataSource, this.prop, this.orderBy)
    ];
  };

   getClass = prop => {
    return {
      "fa-sort": prop != this.prop,
      "fa-caret-up": prop == this.prop && this.orderBy == "asc",
      "fa-caret-down": prop == this.prop && this.orderBy == "desc"
    };
  };

}