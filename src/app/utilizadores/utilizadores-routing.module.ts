import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { UtilizadoresComponent } from './utilizadores.component';
import { UtilizadoresGerarconviteComponent } from './utilizadores-gerarconvite/utilizadores-gerarconvite.component';
import { UtilizadoresRegistarutilizadorComponent } from './utilizadores-registarutilizador/utilizadores-registarutilizador.component';

const routes: Routes = [
  {
    path: 'gerarconvite',
    component: UtilizadoresGerarconviteComponent,
  },
  {
    path: 'registarutilizador',
    component: UtilizadoresRegistarutilizadorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilizadoresRoutingModule {}
