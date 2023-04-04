import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilizadoresComponent } from './utilizadores.component';

const routes: Routes = [
  {
    path: 'gerarconvite',
    component: UtilizadoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilizadoresRoutingModule {}
