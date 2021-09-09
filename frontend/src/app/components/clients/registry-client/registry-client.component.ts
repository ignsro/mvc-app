import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registry-client',
  templateUrl: './registry-client.component.html',
  styleUrls: ['./registry-client.component.css']
})
export class RegistryClientComponent implements OnInit {

  submitted = false;
  onEdit = false;
  title = ""
  butonSubmitLabel = ""

  constructor(
    public matDialogRef: MatDialogRef<RegistryClientComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {id: number, first_name: string, last_name: string, state?: boolean}
  ) { }

  submitValues = this.fb.group(
    {
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      state: [true]
    })  
  
  ngOnInit(): void {
    if (this.data) {
      this.onEdit = true;
      this.submitValues.setValue(
        {
          first_name: this.data.first_name,
          last_name: this.data.last_name,
          state: this.data.state
        })
    }

    this.title = this.onEdit ? "Editar Cliente" : "Agregar Cliente"
    this.butonSubmitLabel = this.onEdit ? 'Actualizar' : 'Agregar'
  }

  get f(): { [key: string]: AbstractControl }  {
    return this.submitValues.controls;
  }
  
  ngOnDestroy(): void {
    this.submitValues.reset();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.submitValues.valid) {
      this.matDialogRef.close({data: this.submitValues.value, valid: this.submitValues.valid, edit: this.onEdit, id: this.data?.id || null });
    }
  }

  onReset(): void {
    this.submitted = false;
    this.submitValues.reset();
  }
}
