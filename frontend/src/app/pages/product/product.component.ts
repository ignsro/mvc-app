import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { CustomPaginator } from './customPaginator';
import { MatDialog } from '@angular/material/dialog';
import { RegistryProductComponent } from 'src/app/components/products/registry-product/registry-product.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/services/loadings/spinner.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class ProductComponent implements OnInit {

  dataTable: Product[] | any = [];
  columns = ['name', 'quantity', 'price', 'actions'];
  loading$ = this._loader.loading$;

  constructor(
    public productService: ProductService,
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _loader: SpinnerService
    ) { }

  ngOnInit(): void {
    this._loader.show();
    this.refreshTable();
  }

  openDialog(newData: any = null) {
    let dialogRef = this._matDialog.open(RegistryProductComponent, {
      data: newData
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result.valid) {
        if (result.edit) {
          this.productService.updateProduct(result.id, result.data)
          .subscribe((response) => {
            this.openSnackBar("Producto actualizado!")
            this.refreshTable();
          }, (error: HttpErrorResponse) => {
            this.openSnackBar("Ocurrio un error al actualizar el producto.")
          })
        } else {
          this.productService.createProduct(result.data)
            .subscribe((product: Product) => {
              this.openSnackBar("Producto creado!")
              this.refreshTable()
            }, (error: HttpErrorResponse) => {
              this.openSnackBar("Ocurrio un error al crear un producto.")
            })
        }
      }
    })
  }

  refreshTable() {
    this.productService.getProducts()
    .subscribe((products: Product[] | any) => {
      this._loader.hide();
      this.dataTable = products;
    }, (error: HttpErrorResponse) => {
      this.openSnackBar("Error al cargar los datos. Esta el servidor online?")
    })
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, "", {
      duration: 2000
    });
  }

  editProduct(rowId: any){
    const data = this.dataTable[rowId];
    this.openDialog(data)
  }

  deleteProduct(rowId: any) {
    const product = this.dataTable[rowId];
    let deleteDialog = this._matDialog.open(DeleteDialogComponent, {
      data: product
    })

    deleteDialog.afterClosed()
    .subscribe((deleteData: any) => {
      if (deleteData.delete) {
        this.productService.deleteProduct(deleteData.data)
        .subscribe((response: any) => {
          this.openSnackBar("Producto eliminado con exito!")
          this.refreshTable();
        }, (error: HttpErrorResponse) => {

        })
      }
    })

  }

}
