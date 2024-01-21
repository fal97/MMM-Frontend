import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@frontend/data-access-lib';

@Component({
  selector: 'frontend-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(private router: Router, private sharedService: SharedService) {}
  isSideBarOpened = false;
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  showHideSideBar() {
   
    this.isSideBarOpened = !this.isSideBarOpened;
    this.sharedService.updateSharedData(this.isSideBarOpened);

  }
}
