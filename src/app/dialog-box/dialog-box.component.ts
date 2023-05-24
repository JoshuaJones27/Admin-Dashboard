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
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private pedidosService: PedidosService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [{ value: data.id, disabled: true }],
      requestName: [data.requestName, Validators.required],
      requestMethod: [data.requestMethod, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const requestId = this.data.id;
      const requestName = this.form.value.requestName;
      const requestMethod = this.form.value.requestMethod;
      this.pedidosService
        .editPedido(requestId, requestName, requestMethod)
        .subscribe((response) => {
          console.log(response);
          const result = {
            ...this.data,
            requestName: requestName,
            requestMethod: requestMethod,
          };
          this.dialogRef.close(result);
        });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  opcao() {
    const requestId = this.data.id;
    console.log('Selected ID1:', requestId); // Verify that the correct ID is being logged
    //debugger;

    this.sharedService.setSelectedId(requestId);
    console.log('Selected ID2:', requestId); // Verify that the correct ID is being logged

    this.router.navigateByUrl('/pedidos/criaropcaopedido');
    this.dialogRef.close();
  }
}
