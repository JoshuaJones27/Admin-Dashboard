import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-pedido-criaropcaopedido',
  templateUrl: './pedido-criaropcaopedido.component.html',
  styleUrls: ['./pedido-criaropcaopedido.component.scss'],
})
export class PedidoCriaropcaopedidoComponent {
  idPedido!: string;
  companyId: string | undefined;
  selectedAppId: string | undefined;
  appIdOptions: { id: string; name: string }[] = [];
  reqURL: string = '';
  schema: string = '';
  database: string = '';

  constructor(
    private sharedService: SharedService,
    private empresaService: EmpresaService
  ) {}

  ngOnInit() {
    this.idPedido = this.sharedService.getSelectedId() || ''; // Assign value to idValue, handle possible null value
    this.companyId = this.sharedService.getCompanyId();
    console.log('idValue do criarpedido:', this.idPedido);

    this.empresaService.getCompanyID().subscribe((response) => {
      console.log('CompanyId:', this.companyId);
      console.log('Response Data:', response.data);
      this.appIdOptions = response.data.model.companyApplications.map(
        (application: any) => ({
          id: application.applicationid,
        })
      );
      console.log(
        'App IDs:',
        this.appIdOptions.map((app) => app.id)
      );
    });
  }
}
