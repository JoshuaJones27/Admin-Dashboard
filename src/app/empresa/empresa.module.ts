// Import Angular core and common modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Angular Material modules for UI components
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

// Import routing module for Empresa feature
import { EmpresaRoutingModule } from './empresa-routing.module';

// Import components used in this module
import { EmpresaComponent } from './empresa.component';
import { EmpresaAdicionarempresaComponent } from './empresa-adicionarempresa/empresa-adicionarempresa.component';

// Import FormsModule for template-driven forms
import { FormsModule } from '@angular/forms';
import { EmpresaConvitegrupoComponent } from './empresa-convitegrupo/empresa-convitegrupo.component';

// Define the EmpresaModule with its declarations and imports
@NgModule({
  // Declare components that belong to this module
  declarations: [
    EmpresaComponent,
    EmpresaAdicionarempresaComponent,
    EmpresaConvitegrupoComponent,
  ],
  // Import necessary Angular and third-party modules
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
