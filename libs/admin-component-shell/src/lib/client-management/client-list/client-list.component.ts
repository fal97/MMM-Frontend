import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  Client,
  MmmClientService,
  InviteStatusType,
  AuthService,
} from '@frontend/data-access-lib';
import {
  AppStateModel,
  getclientinfo,
  loadclients,
} from '@frontend/state-management-lib';

import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'frontend-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  allClients!: Client[];
  dataSource: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  
  displayedColumns: string[] = [
    'name',
    'email',
    'workshop',
    'status',
    'action',
  ];

  options = [
    { label: 'Active', value: 4 },
    { label: 'Inactive', value: 5 },
    { label: 'Requested', value: 2 },
    { label: 'Rejected', value: 3 },
    { label: 'Created', value: 1 },
    { label: 'Clear', value: 'clear' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('statusSelect') statusSelect!: MatSelect;

  

  totalItems = 0;
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  showClearButton = false;
  isTableEmpty = false;
  titleToPass: any = 'Client Management';
  btnList = [{ label: 'Create New Client', routerLink: '/dashboard/add' }];
  constructor(
    private store: Store<AppStateModel>,
    private clientService: MmmClientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  queryParams = {
    pageIndex: this.currentPage,
    pageSize: this.pageSize,
    searchText: '',
    inviteStatus: '',
    isDescending:false,
    sortBy:''
  };

  getClients() {
    this.store.dispatch(loadclients({ queryParams: { ...this.queryParams } }));
    this.store.select(getclientinfo).subscribe((item) => {
      this.allClients = item.items;
      this.totalItems = item.totalCount;
      if (item.totalCount > 0) {
        this.isTableEmpty = true;
      } else {
        this.isTableEmpty = false;
      }
      this.currentPage = item.pageNumber;
      this.dataSource = new MatTableDataSource<Client>(this.allClients);
      this.dataSource.sort = this.sort;
    });
  }

  sortData(columnName: string) {
    if (this.queryParams.sortBy === columnName) {
      // If the same column is clicked again, reverse the sorting order
      this.queryParams.isDescending = !this.queryParams.isDescending;
    } else {
      this.queryParams.sortBy = columnName;
      this.queryParams.isDescending = false; // Default to ascending order
    }
  
    this.getClients(); // Trigger API call with sorting
  }

  FilterBySearch(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.queryParams = {
      ...this.queryParams,
      searchText: value,
    };
    if (value) {
      this.showClearButton = true;
    } else {
      this.showClearButton = false;
    }
    this.getClients();
  }

  filterByStatusDropdown($event: any) {
    console.log('$event.value', $event.value);
    if ($event.value == 'clear') {
      this.queryParams = {
        ...this.queryParams,
        inviteStatus: '',
      };
      this.getClients();
      this.statusSelect.value = null;
    } else {
      const filteredData = this.allClients.filter((item) => {
        console.log('item.inviteStatus', item.inviteStatus);
        return item.inviteStatus == $event.value;
      });

      if (filteredData.length > 0) {
        this.isTableEmpty = true;
      } else {
        this.isTableEmpty = false;
      }
      this.dataSource.data = filteredData;
      this.queryParams = {
        ...this.queryParams,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        inviteStatus: $event.value,
      };
      this.getClients();
    }
  }

  handlePageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.queryParams = {
      ...this.queryParams,
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
    };
    this.getClients();
  }
  clearSearch() {
    this.showClearButton = false;
    this.queryParams.searchText = '';
    this.getClients();
  }

  getInviteStatusText(inviteStatus: number): string {
    console.log('invite status ', inviteStatus);
    switch (inviteStatus) {
      case 1:
        return 'Created';
      case 2:
        return 'Requested';
      case 3:
        return 'Rejected';
      case 4:
        return 'Active';
      case 5:
        return 'Inactive';
      default:
        return '';
    }
  }

  inviteClient(id: number) {
    this.clientService.reInvite(id).subscribe(
      () => {
        Swal.fire('Success', 'Invitation Sent Succesfuly', 'success');
      },
      (error) => {
        Swal.fire('error', 'Inviting Failed', 'error');
      }
    );
  }

  resetPassword(email: string) {
    this.authService.forgetPassword(email).subscribe(
      () => {
        Swal.fire('Success', 'Reset Password Email Sent Succesfuly', 'success');
      },
      (error) => {
        Swal.fire('error', 'Reset Password Email Sending Failed', 'error');
      }
    );
  }
}
