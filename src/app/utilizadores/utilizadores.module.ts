import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilizadoresRoutingModule } from './utilizadores-routing.module';
import { UtilizadoresComponent } from './utilizadores.component';
import { UtilizadoresGerarconviteComponent } from './utilizadores-gerarconvite/utilizadores-gerarconvite.component';

@NgModule({
  declarations: [UtilizadoresComponent, UtilizadoresGerarconviteComponent],
  imports: [CommonModule, UtilizadoresRoutingModule],
})
export class UtilizadoresModule {}
