import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaService } from 'src/app/services/empresa.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-empresa-convitegrupo',
  templateUrl: './empresa-convitegrupo.component.html',
  styleUrls: ['./empresa-convitegrupo.component.scss'],
})
export class EmpresaConvitegrupoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  empresasData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['select', 'internalID', 'applicationid'];

  companyId: string | undefined;

  selection = new SelectionModel<any>(true, []);

  constructor(
    private empresaService: EmpresaService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.companyId = this.sharedService.getCompanyId();
    console.log('CompanyId:', this.companyId);

    this.empresaService.getCompanyID().subscribe((response) => {
      console.log('CompanyId:', this.companyId);
      console.log('Response Data:', response.data);
      this.empresasData = new MatTableDataSource(
        response.data.model.companyApplications.flatMap((application: any) =>
          application.groups.flatMap(
            (group: any) => (
              console.log('application:', application),
              console.log('group:', group),
              {
                applicationid: application.applicationid,
                internalID: group.internalID,
              }
            )
          )
        )
      );
      console.log('empresasData:', this.empresasData);
      console.log('empresasData.data:', this.empresasData.data);

      this.empresasData.sort = this.sort;
      this.empresasData.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empresasData.filter = filterValue.trim().toLowerCase();
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.empresasData.data.forEach((row: any) =>
          this.selection.select(row)
        );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.empresasData.data.length;
    return numSelected === numRows;
  }

  onRowSelect(row: any) {
    this.selection.clear();
    this.selection.select(row);
    console.log('Selected row:', row);
  }

  disableRowSelection(row: any) {
    return (
      this.selection.selected.length > 0 && !this.selection.isSelected(row)
    );
  }

  enviarConvite() {
    const selectedRows = this.selection.selected;
    if (selectedRows.length > 0) {
      selectedRows.forEach((row) => {
        const payload = {
          internalID: row.internalID,
          companyID: this.companyId,
          applicationID: row.applicationid,
        };
        console.log(this.companyId);
        console.log('Payload:', payload);

        this.empresaService.getInviteToGroup(payload).subscribe(
          (response) => {
            console.log('API Response:', response);
            this.snackBar.open(`ID: ${response.data.model.id}`, 'Close', {
              verticalPosition: 'bottom', // Position the snackbar at the top
            });
          },
          (error) => {
            console.log('API Error:', error);
            this.snackBar.open('Empresa com grupo já atribuído', 'Close', {
              duration: 3000, // Duration in milliseconds
              verticalPosition: 'bottom', // Position the snackbar at the top
            });
          }
        );
      });
    } else {
      console.log('No rows selected');
    }
  }
}
