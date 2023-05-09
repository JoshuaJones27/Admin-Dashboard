import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

import { UtilizadoresRoutingModule } from './utilizadores-routing.module';
import { UtilizadoresComponent } from './utilizadores.component';
import { UtilizadoresGerarconviteComponent } from './utilizadores-gerarconvite/utilizadores-gerarconvite.component';

@NgModule({
  declarations: [UtilizadoresComponent, UtilizadoresGerarconviteComponent],
  imports: [
    CommonModule,
    UtilizadoresRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
})
export class UtilizadoresModule {}
