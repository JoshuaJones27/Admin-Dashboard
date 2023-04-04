import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilizadoresRoutingModule } from './utilizadores-routing.module';
import { UtilizadoresComponent } from './utilizadores.component';

@NgModule({
  declarations: [UtilizadoresComponent],
  imports: [CommonModule, UtilizadoresRoutingModule],
})
export class UtilizadoresModule {}
