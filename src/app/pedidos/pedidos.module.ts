import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidosComponent } from './pedidos.component';
import { PedidoFazerpedidoComponent } from './pedido-fazerpedido/pedido-fazerpedido.component';
import { PedidoEditarpedidoComponent } from './pedido-editarpedido/pedido-editarpedido.component';

@NgModule({
  declarations: [
    PedidoFazerpedidoComponent,
    PedidoEditarpedidoComponent,
    PedidosComponent,
  ],
  imports: [CommonModule, PedidoRoutingModule, FormsModule],
})
export class PedidosModule {}
