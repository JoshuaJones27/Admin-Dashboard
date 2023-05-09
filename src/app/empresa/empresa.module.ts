import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { EmpresaAdicionarempresaComponent } from './empresa-adicionarempresa/empresa-adicionarempresa.component';

import { FormsModule } from '@angular/forms';
import { EmpresaConvitegrupoComponent } from './empresa-convitegrupo/empresa-convitegrupo.component';

@NgModule({
  declarations: [
    EmpresaComponent,
    EmpresaAdicionarempresaComponent,
    EmpresaConvitegrupoComponent,
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
})
export class EmpresaModule {}
