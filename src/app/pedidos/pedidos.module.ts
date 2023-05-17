import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidosComponent } from './pedidos.component';
import { PedidoFazerpedidoComponent } from './pedido-fazerpedido/pedido-fazerpedido.component';
import { PedidoEditarpedidoComponent } from './pedido-editarpedido/pedido-editarpedido.component';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { PedidoCriaropcaopedidoComponent } from './pedido-criaropcaopedido/pedido-criaropcaopedido.component';

@NgModule({
  declarations: [
    PedidoFazerpedidoComponent,
    PedidoEditarpedidoComponent,
    PedidosComponent,
    DialogBoxComponent,
    PedidoCriaropcaopedidoComponent,
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  entryComponents: [DialogBoxComponent],
})
export class PedidosModule {}
