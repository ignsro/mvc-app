import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Product } from 'src/app/models/product.model';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Detail } from 'src/app/models/detail.model';

@Component({
  selector: 'app-registry-sale',
  templateUrl: './registry-sale.component.html',
  styleUrls: ['./registry-sale.component.css']
})
export class RegistrySaleComponent implements OnInit {

  clientData: Client[] = [];
  productsData: Product[] = [];

  detailsTableColumns = ['name', 'quantity', 'subtotal', 'actions']
  detailsTable: Detail[] = []

  maxQuantity:number = 0;
  productsForm = this._fb.group({
    name: ['', [Validators.required]],
    quantity: ['', [Validators.required, Validators.max(this.maxQuantity)]]
  })

  nameProduct = new FormControl('', [Validators.required])
  quantityProduct = new FormControl('', [Validators.min(0), (control: AbstractControl) => Validators.max(this.maxQuantity)(control)])


  onSubmitData = this._fb.group({
    discount: [''],
    client_id: ['', [Validators.required]]
  });

  constructor(
    private _clientService: ClientService,
    private _productService: ProductService,
    private _fb: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialogRef: MatDialogRef<RegistrySaleComponent>,
    private _snackBar: MatSnackBar
  ) { }
  

  ngOnInit(): void {
    this._clientService.getClients()
    .subscribe((client: Client[]) => {
      this.clientData = client.filter(x => x.first_name);
    })

    this._productService.getProducts()
    .subscribe((products: Product[]) => {
      this.productsData = products.filter(x => x.name)

    }, (error: HttpErrorResponse) => {
      
    })

    this.nameProduct.valueChanges
    .subscribe((valor: any) => {
      this.maxQuantity = this.productsData.find((x: Product) => x.id === valor)?.quantity || 0
      this.quantityProduct.updateValueAndValidity();
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productsForm.controls;
  }

  addProduct(){
    if (this.nameProduct.valid && this.quantityProduct.valid) {

      const currentProduct = this.productsData.find((x: Product) => x.id === this.nameProduct.value);
      const subtotal = this.quantityProduct.value * currentProduct!.price;
      const toTable: Detail = { 
        product_id: this.nameProduct.value,
        product_name: currentProduct?.name, 
        quantity: this.quantityProduct.value,
        subtotal: subtotal, 
        price: currentProduct?.price
      }
      this.detailsTable = [...this.detailsTable, toTable]
      this._changeDetectorRef.detectChanges();
    }
    this.nameProduct.reset()
    this.quantityProduct.reset()
  }

  getErrorMessageQuantity() {
    if (this.f.quantity.hasError('min')) {
      return 'Debes ingresar una cantidad > 0';
    }
    return this.f.quantity.hasError('max') ? 'La cantidad supera el stock actual :c' : 'La cantidad supera el stock actual';
  }

  checkDisabled(id: any) {
    return this.detailsTable.some(x => x.product_id === id)
  }

  onSubmit(): void {
    if (this.detailsTable.length <= 0) {
      this.openSnackBar();
    }

    if (this.onSubmitData.valid) {
      const data = {
        discount: this.onSubmitData.get('discount')?.value || 0,
        client: this.onSubmitData.get('client_id')?.value,
        details: this.detailsTable
      }
      this._matDialogRef.close(data)
    }
  }

  openSnackBar() {
    this._snackBar.open("No hay ningun producto en la tabla");
  }

  removeDatailToTable(rowid: any){
    if (rowid > -1) {
      this.detailsTable = this.detailsTable.filter((item, index) => index != rowid)
      this._changeDetectorRef.detectChanges();
    }
  }

  getSubtotal(){

  }

  getTotalCost(){
    const a = this.detailsTable.map((d: Detail) => d.subtotal).reduce((acc = 0, value = 0) => acc + value, 0);
    return a;
  }
}
