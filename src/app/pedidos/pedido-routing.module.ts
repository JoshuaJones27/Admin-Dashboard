import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoFazerpedidoComponent } from './pedido-fazerpedido/pedido-fazerpedido.component';
import { PedidoEditarpedidoComponent } from './pedido-editarpedido/pedido-editarpedido.component';

const routes: Routes = [
  {
    path: 'fazerpedido',
    component: PedidoFazerpedidoComponent,
  },
  {
    path: 'editarpedido',
    component: PedidoEditarpedidoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoRoutingModule {}
