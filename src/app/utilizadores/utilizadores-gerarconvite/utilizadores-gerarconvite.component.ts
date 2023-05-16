import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { EmpresaService } from 'src/app/services/empresa.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-utilizadores-gerarconvite',
  templateUrl: './utilizadores-gerarconvite.component.html',
  styleUrls: ['./utilizadores-gerarconvite.component.scss'],
})
export class UtilizadoresGerarconviteComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  empresasData!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'select',
    'internalID',
    'internalFullName',
    'internalEmail',
    'telegramID',
    'applicationid',
  ];

  companyId: string | undefined;

  selection = new SelectionModel<any>(true, []);

  constructor(
    private empresaService: EmpresaService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.companyId = this.sharedService.getCompanyId();
    console.log(this.companyId);

    this.empresaService.getCompanyID().subscribe((response) => {
      console.log(this.companyId);
      console.log(response.data);
      this.empresasData = new MatTableDataSource(
        response.data.model.companyApplications.flatMap((application: any) =>
          application.usersCompany.map((user: any) => ({
            ...user,
            applicationid: application.applicationid,
          }))
        )
      );

      this.empresasData.sort = this.sort;
      this.empresasData.paginator = this.paginator;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.empresasData.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.empresasData) {
      this.empresasData.data.forEach((row: any) => {
        if (!row.telegramID) {
          this.selection.toggle(row);
        }
      });
    }
  }

  // checkboxChange(row: any) {
  //   if (row.telegramID) {
  //     this.selection.deselect(row);
  //     console.log('Deselected row:', row);
  //   }
  // }

  checkboxChange(row: any) {
    if (row.telegramID) {
      this.selection.deselect(row);
      console.log('Deselected row:', row);
    } else {
      this.selection.toggle(row);
      console.log('Selected row:', row);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empresasData.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row: any) {
    console.log(row);
  }

  selectedApplicationIds: string[] = [];

  onRowSelect(row: any) {
    const duplicateSelected = this.selectedApplicationIds.includes(
      row.applicationid
    );
    if (!duplicateSelected) {
      this.selection.toggle(row);
      if (this.selection.isSelected(row)) {
        this.selectedApplicationIds.push(row.applicationid);
      } else {
        const index = this.selectedApplicationIds.indexOf(row.applicationid);
        if (index !== -1) {
          this.selectedApplicationIds.splice(index, 1);
        }
      }
    }
  }

  isApplicationIdSelected(applicationid: string): boolean {
    return this.selectedApplicationIds.includes(applicationid);
  }

  disableRowSelection(row: any): boolean {
    const selectedRows = this.selection.selected;
    const duplicateSelected = selectedRows.some(
      (selectedRow) => selectedRow.applicationid === row.applicationid
    );
    return duplicateSelected;
  }

  enviarConvite() {
    const selectedRows = this.selection.selected;
    if (selectedRows.length > 0) {
      const users = selectedRows.map((row) => ({
        internalid: row.internalID.toString(),
        applicationid: row.applicationid,
      }));

      const payload = {
        users: users,
        companyid: this.companyId,
        linitdate: new Date().toISOString(),
      };

      console.log('Payload:', payload);

      // Call the API to send the payload
      this.empresaService.getInviteToCompany(payload).subscribe(
        (response) => {
          console.log('API Response:', response);
          console.log('Messages:', response.data.messages);
          // Handle success
        },
        (error) => {
          console.log('API Error:', error);
          // Handle error
        }
      );
    } else {
      console.log('No rows selected');
    }
  }
}
