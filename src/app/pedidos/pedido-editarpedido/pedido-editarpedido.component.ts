import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PedidosService } from 'src/app/services/pedidos.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';

@Component({
  selector: 'app-pedido-editarpedido',
  templateUrl: './pedido-editarpedido.component.html',
  styleUrls: ['./pedido-editarpedido.component.scss'],
})
export class PedidoEditarpedidoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pedidosData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'requestName', 'requestMethod'];

  constructor(
    private pedidosService: PedidosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pedidosService.getPedidos().subscribe((response) => {
      console.log(response.data);
      this.pedidosData = new MatTableDataSource(response.data.model);
      this.pedidosData.paginator = this.paginator;
      this.pedidosData.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pedidosData.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row: any) {
    this.openDialog(row);
  }

  openDialog(row: any): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.pedidosService
          .editPedido(row.id, result.requestName, result.requestMethod)
          .subscribe(() => {
            this.onReloadData();
          });
      }
    });
  }

  onReloadData() {
    this.pedidosService.getPedidos().subscribe((response) => {
      console.log(response.data);
      this.pedidosData = new MatTableDataSource(response.data.model);
      this.pedidosData.paginator = this.paginator;
      this.pedidosData.sort = this.sort;
    });
  }
}
