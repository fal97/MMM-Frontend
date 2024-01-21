import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { MmmAdminService } from '@frontend/data-access-lib';

@Component({
  selector: 'frontend-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  upComingWorkshop: any;
  activeClients: any;
  requestedClients: any;
  allActiveClients: any;
  allInactiveClients: any;
  formattedUpcomingWorkshop: any;
  constructor(private mmmAdminService: MmmAdminService) {}
  ngOnInit() {
    this.getClientDashboardDataByID();
  }

  getClientDashboardDataByID() {
    this.mmmAdminService.getAdminDashboardData().subscribe((data: any) => {
      this.upComingWorkshop = data.upcomingWorkshopDate;
      this.activeClients = data.numberOfActiveClients;
      this.requestedClients = data.numberOfRequestedClients;
      this.allActiveClients = data.numberOfAllActiveClients;
      this.allInactiveClients = data.numberOfAllInactiveClients;
    });
  }
}
