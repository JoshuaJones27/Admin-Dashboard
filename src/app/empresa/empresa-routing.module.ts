import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaAdicionarempresaComponent } from './empresa-adicionarempresa/empresa-adicionarempresa.component';
import { EmpresaConvitegrupoComponent } from './empresa-convitegrupo/empresa-convitegrupo.component';

// Define the routes for the Empresa module
const routes: Routes = [
  {
    // Route for adding a company
    path: 'adicionarempresa',
    component: EmpresaAdicionarempresaComponent,
  },
  {
    // Route for generating a group invitation
    path: 'gerarconvite',
    component: EmpresaConvitegrupoComponent,
  },
];

@NgModule({
  // Import the RouterModule and apply the child routes
  imports: [RouterModule.forChild(routes)],
  // Export RouterModule so it's available throughout the module
  exports: [RouterModule],
})
// EmpresaRoutingModule handles routing for the Empresa feature module
export class EmpresaRoutingModule {}
