// Angular core module decorator
import { NgModule } from '@angular/core';
// Provides services that are essential to launch and run a browser app
import { BrowserModule } from '@angular/platform-browser';
// For template-driven forms
import { FormsModule } from '@angular/forms';
// Custom translation service
import { TradutorService } from './services/tradutor.service';

// Angular Material modules for UI components
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';

// Enables animations support
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Application routing module
import { AppRoutingModule } from './app-routing.module';
// Root component
import { AppComponent } from './app.component';
// Dashboard page component
import { DashboardComponent } from './dashboard/dashboard.component';
// Main body content component
import { BodyComponent } from './body/body.component';
// Side navigation component
import { SidenavComponent } from './sidenav/sidenav.component';

// Angular CDK overlay module for floating panels
import { OverlayModule } from '@angular/cdk/overlay';
// Login page component
import { LoginComponent } from './login/login.component';
// Sublevel menu for sidenav
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
// Formulario (form) component
import { FormularioComponent } from './formulario/formulario.component';

// Main application module definition
@NgModule({
  // Declare all components used in this module
  declarations: [
    AppComponent,
    DashboardComponent,
    BodyComponent,
    SidenavComponent,
    LoginComponent,
    SublevelMenuComponent,
    FormularioComponent,
  ],
  // Import required Angular and third-party modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
  ],
  // Register application-wide services
  providers: [TradutorService],
  // Bootstrap the root component
  bootstrap: [AppComponent],
})
export class AppModule {}
