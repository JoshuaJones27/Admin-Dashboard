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
  // References to paginator and sort components
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Data source for the table
  empresasData!: MatTableDataSource<any>;
  // Columns to be displayed in the table
  displayedColumns: string[] = ['select', 'internalID', 'applicationid'];

  // Company ID for the current session
  companyId: string | undefined;

  // Selection model for table rows (multiple selection enabled)
  selection = new SelectionModel<any>(true, []);

  constructor(
    private empresaService: EmpresaService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Get company ID from shared service
    this.companyId = this.sharedService.getCompanyId();
    console.log('CompanyId:', this.companyId);

    // Fetch company data from API
    this.empresaService.getCompanyID().subscribe((response) => {
      console.log('CompanyId:', this.companyId);
      console.log('Response Data:', response.data);

      // Flatten the nested companyApplications and groups into a single array for the table
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

      // Assign paginator and sort to the table data source
      this.empresasData.sort = this.sort;
      this.empresasData.paginator = this.paginator;
    });
  }

  // Filter the table data based on user input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empresasData.filter = filterValue.trim().toLowerCase();
  }

  // Toggle selection of all rows
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.empresasData.data.forEach((row: any) =>
          this.selection.select(row)
        );
  }

  // Check if all rows are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.empresasData.data.length;
    return numSelected === numRows;
  }

  // Select a single row and clear previous selection
  onRowSelect(row: any) {
    this.selection.clear();
    this.selection.select(row);
    console.log('Selected row:', row);
  }

  // Disable selection for other rows if one is already selected
  disableRowSelection(row: any) {
    return (
      this.selection.selected.length > 0 && !this.selection.isSelected(row)
    );
  }

  // Send invitation for the selected rows
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

        // Call API to send invite
        this.empresaService.getInviteToGroup(payload).subscribe(
          (response) => {
            console.log('API Response:', response);
            // Show success message with returned ID
            this.snackBar.open(`ID: ${response.data.model.id}`, 'Close', {
              verticalPosition: 'bottom', // Position the snackbar at the bottom
            });
          },
          (error) => {
            console.log('API Error:', error);
            // Show error message if invite fails
            this.snackBar.open('Empresa com grupo já atribuído', 'Close', {
              duration: 3000, // Duration in milliseconds
              verticalPosition: 'bottom', // Position the snackbar at the bottom
            });
          }
        );
      });
    } else {
      console.log('No rows selected');
    }
  }
}
