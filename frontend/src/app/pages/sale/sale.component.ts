import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrySaleComponent } from 'src/app/components/sales/registry-sale/registry-sale.component';
import { Sale } from 'src/app/models/sales.model';
import { SpinnerService } from 'src/app/services/loadings/spinner.service';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  name = ''

  dataTable = [];
  columns = ['sale_at', 'iva', 'discount', 'total']

  loading$ = this._loader.loading$;

  constructor(
    private matDialog: MatDialog,
    private _loader: SpinnerService,
    private _saleService: SaleService,
    private _snackBar: MatSnackBar
  ) { }

  openDialog() {
    let saleRegistryDailog = this.matDialog.open(RegistrySaleComponent)
    
    saleRegistryDailog.afterClosed()
    .subscribe((data: any) => {
      if (data) {
        this._saleService.createSale(data)
        .subscribe((sale: Sale) => {
          this.refresh();
        })
      }
    })
  }

  ngOnInit(): void {
    this._loader.show();
    this.refresh();
  }

  refresh(): void {
    this._saleService.getAll()
    .subscribe((sales: any) => {
      this._loader.hide();
      this.dataTable = sales.map((sale: any) => ({...sale, sale_at: new Date(sale.sale_at).toLocaleString() }));
    }, (error: HttpErrorResponse) => {

    })
  }

  openSnackBar() {
    let snack = this._snackBar.open("Error al cargar los datos. Esta el servidor online?", "Recargar");
    snack.afterDismissed()
    .subscribe((result) => this.refresh())
  }

}
