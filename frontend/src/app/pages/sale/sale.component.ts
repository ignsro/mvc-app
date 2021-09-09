import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrySaleComponent } from 'src/app/components/sales/registry-sale/registry-sale.component';
import { ViewSaleComponent } from 'src/app/components/sales/view-sale/view-sale.component';
import { Client } from 'src/app/models/client.model';
import { Sale } from 'src/app/models/sales.model';
import { SpinnerService } from 'src/app/services/loadings/spinner.service';
import { SaleService } from 'src/app/services/sale.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  dataTable: Sale[] = []
  columns = ['Client', 'sale_at', 'discount', 'iva', 'total', 'actions']

  loading$ = this._loader.loading$;

  constructor(
    private matDialog: MatDialog,
    private _loader: SpinnerService,
    private _saleService: SaleService,
    private _snackBar: MatSnackBar
  ) { }

  openDialog(newData: any = null) {
    let saleRegistryDailog = this.matDialog.open(RegistrySaleComponent, {
      data: newData
    })
    
    saleRegistryDailog.afterClosed()
    .subscribe((result: any) => {
      if (result.valid) {
        debugger
        if (result.edit) {
          this._saleService.updateSale(result.id, result.data)
          .subscribe((response) => {
            this.openSnackBar("Venta actualizada");
            this.refresh();
          }, (error: HttpErrorResponse) => {
            this.openSnackBar("Ocurrio un error al actulizar una venta");
          })
        } else {
          this._saleService.createSale(result)
          .subscribe((sale: Sale) => {
            this.refresh();
            this.openSnackBar("Venta agregada correctamente!")
          }, (error: HttpErrorResponse) => {
            this.openSnackBar("Ocurrio un error al crear una venta");

          })
        }
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
      this.dataTable = sales.map((sale: any) => ({...sale, sale_at: new Date(sale.sale_at).toLocaleString(), client: sale.Client}));
    }, (error: HttpErrorResponse) => {
    })
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, '', {
      duration: 2000
    })
  }

  viewDetails(rowid:any){
    this.matDialog.open(ViewSaleComponent, {
      data: this.dataTable[rowid]
    })
  }


  updateSale(rowid: any) {
    const sale = this.dataTable[rowid];
    this.openDialog(sale)
  }

  deleteSale(rowid: any) {
    const sale = this.dataTable[rowid];
    let deleteDialog = this.matDialog.open(DeleteDialogComponent, {
      data: sale
    })

    deleteDialog.afterClosed()
    .subscribe((deleteData) => {
      if (deleteData) {
        this._saleService.deleteSale(deleteData.data)
        .subscribe((response) => {
          this.openSnackBar("Venta eliminado con exito");
          this.refresh();
        })
      }
    })
  }

}
