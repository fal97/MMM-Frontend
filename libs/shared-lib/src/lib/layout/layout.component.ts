import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'frontend-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    const token = localStorage.getItem('isLoggedIn');
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
