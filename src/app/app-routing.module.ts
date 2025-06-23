import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from './auth.guard';

// Define application routes
const routes: Routes = [
  {
    path: '', // Default path
    redirectTo: '/login', // Redirect to login page
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent }, // Login route
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protected by AuthGuard
  },
  {
    path: 'empresa',
    loadChildren: () =>
      import('./empresa/empresa.module').then((m) => m.EmpresaModule), // Lazy-loaded module
    canActivate: [AuthGuard], // Protected by AuthGuard
  },
  {
    path: 'utilizadores',
    loadChildren: () =>
      import('./utilizadores/utilizadores.module').then(
        (m) => m.UtilizadoresModule
      ), // Lazy-loaded module
    canActivate: [AuthGuard], // Protected by AuthGuard
  },
  {
    path: 'pedidos',
    loadChildren: () =>
      import('./pedidos/pedidos.module').then((m) => m.PedidosModule), // Lazy-loaded module
    canActivate: [AuthGuard], // Protected by AuthGuard
  },
  {
    path: 'formulario',
    component: FormularioComponent,
    canActivate: [AuthGuard], // Protected by AuthGuard
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import routes into the app
  exports: [RouterModule], // Export RouterModule for use in the app
})
export class AppRoutingModule {}
