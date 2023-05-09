import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { EmpresaService } from 'src/app/services/empresa.service';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { forkJoin, Observable, from } from 'rxjs';
import axios, { AxiosResponse } from 'axios';

export interface Element {
  internalID: number;
  internalFullName: string;
  internalEmail: string;
  applicationID: number;
}

@Component({
  selector: 'app-empresa-convitegrupo',
  templateUrl: './empresa-convitegrupo.component.html',
  styleUrls: ['./empresa-convitegrupo.component.scss'],
})
export class EmpresaConvitegrupoComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'internalID',
    'internalFullName',
    'internalEmail',
    'applicationId',
    //'applicationName'
  ];

  @Input() applicationId: string = '';

  usersData: Element[] = [];

  dataSource = new MatTableDataSource<Element>(this.usersData);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new SelectionModel<Element>(true, []);

  baseUrl = 'https://localhost:7017/api/Companies/';

  companyId: string | undefined;
  companyData: any;

  constructor(
    private empresaService: EmpresaService,
    private sharedService: SharedService
  ) {
    this.applicationId = '';
  }

  ngOnInit(): void {
    console.log('Application ID:', this.applicationId);
    this.companyId = this.sharedService.getCompanyId();
    console.log('Company ID:', this.companyId);

    this.empresaService
      .getCompanyID()
      .pipe(
        switchMap((response: any) => {
          console.log('Company Data:', response.data);
          const companyData = response.data;
          const companyId = response.data._id;
          const companyApplications = response.data.companyApplications;
          const applicationData =
            companyApplications &&
            companyApplications.find(
              (app: any) => app._id === this.applicationId
            );
          console.log('Application ID:', this.applicationId);

          console.log('Application Data:', applicationData);
          const users = response.data.UsersCompany
            ? response.data.UsersCompany.map((user: any) => ({
                internalID: user.internalID,
                internalFullName: user.internalFullName,
                internalEmail: user.internalEmail,
              }))
            : [];

          console.log('Users:', users);
          const data = {
            companyData,
            companyId,
            applicationData,
            users,
            usersData: users,
          };
          console.log('Data:', data);
          return of(data);
        })
      )
      .subscribe((data) => {
        console.log('Final Data:', data);
        this.usersData = data.usersData;
        this.dataSource.data = this.usersData;
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  filteredData: Element[] = [];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'internalID':
          return item.internalID;
        case 'internalFullName':
          return item.internalFullName;
        case 'internalEmail':
          return item.internalEmail;
        case 'applicationId':
          return item.applicationId;
        default:
          return item[property];
      }
    };

    this.dataSource.filterPredicate = (
      data: Record<string, any>,
      filter: string
    ) => {
      const dataStr = Object.keys(data)
        .reduce((currentTerm: string, key: string) => {
          return currentTerm + data[key] + '◬';
        }, '')
        .toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.dataSource.filter = '';

    this.dataSource.paginator.firstPage();

    this.dataSource.connect().subscribe((data) => {
      this.filteredData = data;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface Element {
  [key: string]: any;
  internalID: number;
  internalFullName: string;
  internalEmail: string;
  applicationId: string;
}
