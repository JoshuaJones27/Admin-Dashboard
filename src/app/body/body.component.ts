import { Component, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  companyId: string | undefined;
  companyName: string | undefined;

  constructor(
    private sharedService: SharedService,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    this.companyId = this.sharedService.getCompanyId();
    console.log('CompanyId:', this.companyId);

    this.empresaService.getCompanyID().subscribe(
      (response) => {
        console.log('Response Data:', response.data);
        this.companyName = response.data.model.name; // Access the nested 'name' property
        console.log('CompanyName:', this.companyName);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
