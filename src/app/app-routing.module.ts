import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'empresa',
    loadChildren: () =>
      import('./empresa/empresa.module').then((m) => m.EmpresaModule),
  },
  {
    path: 'utilizadores',
    loadChildren: () =>
      import('./utilizadores/utilizadores.module').then(
        (m) => m.UtilizadoresModule
      ),
  },
  {
    path: 'pedidos',
    loadChildren: () =>
      import('./pedidos/pedidos.module').then((m) => m.PedidosModule),
  },
  {
    path: 'formulario',
    component: FormularioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
