import { Component, Inject, OnInit } from '@angular/core';
import { Detail } from 'src/app/models/detail.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sale } from 'src/app/models/sales.model';

@Component({
  selector: 'app-view-sale',
  templateUrl: './view-sale.component.html',
  styleUrls: ['./view-sale.component.css']
})
export class ViewSaleComponent implements OnInit {

  detailsTable:Detail[] = [];
  detailsTableColumns = ['name', 'quantity', 'subtotal']

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.detailsTable = this.data.Details;
  }

  getTotalCost(){
    return ''
  }

}
