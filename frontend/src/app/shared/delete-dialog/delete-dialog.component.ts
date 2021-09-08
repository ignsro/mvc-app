import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  delete = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: string | number},
    public _matRef: MatDialogRef<DeleteDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onDelete(){
    this.delete = true;
    this._matRef.close({
      data: this.data.id,
      delete: this.delete
    })
  }
}
