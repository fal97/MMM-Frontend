import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workshop } from '@frontend/data-access-lib';
import {
  AppStateModel,
  getworkshop,
  getworkshopinfo,
  loadworkshops,
} from '@frontend/state-management-lib';
import { Store } from '@ngrx/store';

@Component({
  selector: 'frontend-workshoplist',
  templateUrl: './workshoplist.component.html',
  styleUrls: ['./workshoplist.component.css'],
})
export class WorkshoplistComponent implements OnInit {
  allWorkShop!: Workshop[];
  dataSource: MatTableDataSource<Workshop> = new MatTableDataSource<Workshop>();

  displayedColumns: string[] = [
    'name',
    'startDate',
    'endDate',
    'status',
    'action',
  ];

  options = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
    { label: 'Clear', value: 'clear' },
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatDateRangePicker, { static: true })
  picker!: MatDateRangePicker<Date>;

  totalItems = 0;
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  showClearButton = false;
  showClearButtonDate = false;
  isTableEmpty = false;

  dateRangeForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  queryParams = {
    pageIndex: this.currentPage,
    pageSize: this.pageSize,
    searchText: '',
    startDate: '',
    endDate: '',
    isDescending:false,
    sortBy:''
  };
  titleToPass: any = 'Workshop Management';
  btnList = [
    {
      label: 'Create New Workshop',
      routerLink: '/dashboard/workshopManagementAdd',
    },
  ];
  constructor(private store: Store<AppStateModel>) {}

  ngOnInit(): void {
    this.getWorkShops();
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

    this.getWorkShops();
  }

  getWorkShops() {
    this.store.dispatch(
      loadworkshops({ queryParams: { ...this.queryParams } })
    );
    this.store.select(getworkshopinfo).subscribe((item) => {
      this.allWorkShop = item.items;
      this.totalItems = item.totalCount;
      if (item.totalCount > 0) {
        this.isTableEmpty = true;
      } else {
        this.isTableEmpty = false;
      }
      this.dataSource = new MatTableDataSource<Workshop>(this.allWorkShop);
      this.currentPage = item.pageNumber;
      this.dataSource.paginator = this.paginator;
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
  
    this.getWorkShops(); // Trigger API call with sorting
  }

  filterByStatusDropdown($event: any) {
    if ($event.value == 'clear') {
      this.getWorkShops();
    } else {
      const filteredData = this.allWorkShop.filter((item) => {
        return item.isActive == $event.value;
      });
      if (filteredData.length > 0) {
        this.isTableEmpty = true;
      } else {
        this.isTableEmpty = false;
      }
      this.dataSource.data = filteredData;
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
    this.getWorkShops();
  }

  clearSearch() {
    this.showClearButton = false;
    this.queryParams.searchText = '';
    this.getWorkShops();
  }

  dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    if (this.dateRangeForm) {
      this.queryParams = {
        ...this.queryParams,
        startDate: dateRangeStart.value,
        endDate: dateRangeEnd.value,
      };
      this.getWorkShops();
      this.showClearButtonDate = true;
    }
  }

  clearStartDate(event: Event): void {
    event.stopPropagation();
    if (this.dateRangeForm) {
      this.dateRangeForm.get('start')?.setValue(null);
      this.dateRangeForm.get('end')?.setValue(null);
      this.queryParams.startDate = '';
      this.queryParams.endDate = '';
      this.getWorkShops();
      this.showClearButtonDate = false;
    }
  }
}
