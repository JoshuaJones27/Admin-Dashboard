import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PedidosService } from '../services/pedidos.service';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent {
  form: FormGroup; // Form group for dialog form

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>, // Reference to the dialog
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, // Injected dialog data
    private fb: FormBuilder, // Form builder for reactive forms
    private pedidosService: PedidosService, // Service for pedidos API
    private sharedService: SharedService, // Shared service for state
    private router: Router // Angular router
  ) {
    // Initialize the form with data from dialog input
    this.form = this.fb.group({
      id: [{ value: data.id, disabled: true }], // Disabled ID field
      requestName: [data.requestName, Validators.required], // Required request name
      requestMethod: [data.requestMethod, Validators.required], // Required request method
    });
  }

  // Submit form handler
  submit() {
    if (this.form.valid) {
      const requestId = this.data.id;
      const requestName = this.form.value.requestName;
      const requestMethod = this.form.value.requestMethod;
      // Call service to edit pedido
      this.pedidosService
        .editPedido(requestId, requestName, requestMethod)
        .subscribe((response) => {
          console.log(response);
          // Prepare result object with updated values
          const result = {
            ...this.data,
            requestName: requestName,
            requestMethod: requestMethod,
          };
          // Close dialog and return result
          this.dialogRef.close(result);
        });
    }
  }

  // Cancel button handler
  cancel() {
    this.dialogRef.close();
  }

  // Handler for custom option action
  opcao() {
    const requestId = this.data.id;
    console.log('Selected ID1:', requestId); // Log selected ID

    this.sharedService.setSelectedId(requestId); // Set selected ID in shared service
    console.log('Selected ID2:', requestId); // Log again for verification

    this.router.navigateByUrl('/pedidos/criaropcaopedido'); // Navigate to new route
    this.dialogRef.close(); // Close dialog
  }
}
