import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaAdicionarempresaComponent } from './empresa-adicionarempresa/empresa-adicionarempresa.component';
import { EmpresaConvitegrupoComponent } from './empresa-convitegrupo/empresa-convitegrupo.component';

const routes: Routes = [
  {
    path: 'adicionarempresa',
    component: EmpresaAdicionarempresaComponent,
  },
  {
    path: 'gerarconvite',
    component: EmpresaConvitegrupoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaRoutingModule {}
