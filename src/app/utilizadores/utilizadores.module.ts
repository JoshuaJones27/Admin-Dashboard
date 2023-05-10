import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

import { UtilizadoresRoutingModule } from './utilizadores-routing.module';
import { UtilizadoresComponent } from './utilizadores.component';
import { UtilizadoresGerarconviteComponent } from './utilizadores-gerarconvite/utilizadores-gerarconvite.component';
import { UtilizadoresRegistarutilizadorComponent } from './utilizadores-registarutilizador/utilizadores-registarutilizador.component';

@NgModule({
  declarations: [
    UtilizadoresComponent,
    UtilizadoresGerarconviteComponent,
    UtilizadoresRegistarutilizadorComponent,
  ],
  imports: [
    CommonModule,
    UtilizadoresRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
})
export class UtilizadoresModule {}
