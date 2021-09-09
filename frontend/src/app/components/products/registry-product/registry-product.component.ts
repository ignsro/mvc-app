import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';



@Component({
  selector: 'app-registry-product',
  templateUrl: './registry-product.component.html',
  styleUrls: ['./registry-product.component.css']
})
export class RegistryProductComponent implements OnInit {

  onEdit = false;
  title = ""
  butonSubmitLabel = ""

  constructor(
    public fb: FormBuilder,
    public matDialogRef: MatDialogRef<RegistryProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.onEdit = true
      this.submitValues.setValue({
        name: this.data.name,
        price: this.data.price,
        quantity: this.data.quantity
      })
    }
    
    this.title = this.onEdit ? "Editar Producto" : "Agregar Producto"
    this.butonSubmitLabel = this.onEdit ? 'Actualizar' : 'Agregar'
  }

  get f(): { [key: string]: AbstractControl } {
    return this.submitValues.controls;
  }

  submitValues = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    quantity: ['', [Validators.required]]
  })

  onSubmit(): void {
    if (this.submitValues.valid) {
      this.matDialogRef.close({data: this.submitValues.value, valid: this.submitValues.valid, edit: this.onEdit, id: this.data?.id || null})
    }
  }

  onReset(): void {
    this.submitValues.reset();
  }
}
