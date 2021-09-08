import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegistryClientComponent } from 'src/app/components/clients/registry-client/registry-client.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/services/loadings/spinner.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  dataTable: Client[] = [];
  columns = ['first_name', 'last_name', 'state', 'actions']

  onSunmitData = [];
  loading$ = this._loader.loading$;

  constructor(
    public clientService: ClientService,
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _loader: SpinnerService
  ) { }

  ngOnInit(): void {
    this._loader.show();
    this.refreshTable();
  }

  openDialog(newData: any = null) {
    let dialogRef = this._matDialog.open(RegistryClientComponent, {
      data: newData,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result.valid) {
        if (result.edit) {
          this.clientService.updateClient(result.id, result.data)
          .subscribe((response: any) => {
            this.refreshTable();
          })
        } else {
          this.clientService.createClient(result.data)
            .subscribe((client: Client) => {
              this.refreshTable()
            }, (error: HttpErrorResponse) => {
              console.log(error)
            })
        }
      }
    })
  }

  refreshTable() {
    this.clientService.getClients()
      .subscribe(
        (clients: Client[] | any) => {
          this._loader.hide();
          this.dataTable = clients.map((x: Client) => (
            {
              ...x,
              id: x.id,
              first_name: x.first_name ? x.first_name : 'SIN DATOS',
              last_name: x.last_name ? x.last_name : 'SIN DATOS',
              stateLabel: x.state ? 'Habilitado' : 'Deshabilitado',
              state: x.state
            }))
        }, (error: HttpErrorResponse) => {
          if (error) {
            this.openSnackBar("Error al cargar los datos. Esta el servidor online?")
          }
        }
      )
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, '', { duration : 2000});
  }

  editClient(rowId: any): void {
    const data = this.dataTable[rowId]
    this.openDialog(data)
  }

  deleteClient(rowId: any): void {
    const client = this.dataTable[rowId];
    let deleteDialog = this._matDialog.open(DeleteDialogComponent, {
      data: client
    })

    deleteDialog.afterClosed()
    .subscribe((deleteData: any) => {
      if (deleteData.delete) {
        this.clientService.deleteClient(deleteData.data)
        .subscribe((response: any) => {
          this.openSnackBar("Cliente eliminado con exito!")
          this.refreshTable();
        }, (error: HttpErrorResponse) => {

        })
      }
    })

  }

}
