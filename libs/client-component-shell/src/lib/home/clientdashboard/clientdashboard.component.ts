import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MmmClientService } from '@frontend/data-access-lib';
import { AppStateModel } from '@frontend/state-management-lib';
import { Store } from '@ngrx/store';
interface ClientDashboardData {
  totalIncome: number;
  // Define other properties here
}
@Component({
  selector: 'frontend-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrls: ['./clientdashboard.component.css'],
})
export class ClientdashboardComponent implements OnInit {
  clientId: any;
  totalIncome: any;
  totalExpence: any;
  loanAmount: any;
  interestRate: any;
  titleToPass: any = 'Home Page';
  allWorkshops!: any[];

  btnList = [
    { label: 'View/Edit Profile', routerLink: '/clientdashboard/viewEditMyProfile/' },
    { label: 'View My Progress', routerLink: '/dashboard/' },
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'name',
   
    'action',
  ];

  constructor(
    private jwtHelper: JwtHelperService,
    private formBuilder: FormBuilder,
    private store: Store<AppStateModel>,
    private mmmClientService: MmmClientService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      this.clientId =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
      console.log('client id', this.clientId);
      localStorage.setItem('clientId', this.clientId);
    }
  }

  ngOnInit() {
    this.getClientDashboardDataByID(Number(this.clientId));
  }

  getClientDashboardDataByID(clientId: number) {
    this.mmmClientService.getClientDashboardData(clientId).subscribe((data) => {
      console.log('data', data); // Log the response to check its structure
      this.totalIncome = data.totalIncome;
      this.totalExpence = data.totalExpense;
      this.loanAmount = data.loanAmount;
      this.interestRate = data.interestRate;
      this.allWorkshops = data.workshops;
      this.dataSource = new MatTableDataSource<any>(this.allWorkshops);
    });
  }
}
   
 
