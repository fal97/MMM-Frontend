import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IncomeExpense,
  MmmIncomeExpenseService,
  TransactionType,
} from '@frontend/data-access-lib';

@Component({
  selector: 'frontend-income-summary',
  templateUrl: './income-summary.component.html',
  styleUrls: ['./income-summary.component.css'],
})
export class IncomeSummaryComponent implements OnInit {
  incomes: any = [];
  clientId: any;
  allIncomes!: IncomeExpense[];
  dataSource: MatTableDataSource<IncomeExpense> =
    new MatTableDataSource<IncomeExpense>();
  isAddMode = false;
  queryParams: any;
  incomeAmount: any;

  displayedColumns: string[] = [
    'date',
    'income Category',
    'description',
    'amount',
  ];

  @ViewChild('formDirective') private formDirective!: NgForm;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  totalItems = 0;
  currentPage = 1;
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  showClearButton = false;
  showClearButtonDate = false;
  isTableEmpty = false;
  selectIncomeId!: number;

  constructor(private incomeService: MmmIncomeExpenseService,private router: Router, private route:ActivatedRoute) {}

  ngOnInit() {
    this.clientId = localStorage.getItem('clientId');

    this.queryParams = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
      TransactionType: TransactionType.INCOME,
      ClientId: Number(this.clientId),
    };

    this.getIncomes();
  }

  getIncomeCatogoryText(inviteStatus: number): string {
    switch (inviteStatus) {
      case 26:
        return 'Other Credit';
      case 27:
        return 'Wages';
      case 28:
        return 'Non SACC Loans';
      default:
        return '';
    }
  }

  getIncomes() {
    this.incomeService.getIncomeExpense(this.queryParams).subscribe((item) => {
      this.allIncomes = item.items;
      this.totalItems = item.totalCount;
      if (item.totalCount > 0) {
        this.isTableEmpty = true;
      } else {
        this.isTableEmpty = false;
      }
      this.dataSource = new MatTableDataSource<IncomeExpense>(this.allIncomes);
      this.currentPage = item.pageNumber;
      this.dataSource.paginator = this.paginator;
      this.incomeAmount = item.totalAmount;
    });
  }

  handlePageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.queryParams = {
      ...this.queryParams,
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
    };
    this.getIncomes();
  }


  // reloadPage(){
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   this.router.navigate(['/'], {
  //     relativeTo: this.route
  //   })
  // }
}
