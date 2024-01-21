import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'frontend-title-with-button',
  templateUrl: './title-with-button.component.html',
  styleUrls: ['./title-with-button.component.css'],
})
export class TitleWithButtonComponent implements OnInit {
  isButtonListShown = true;
  @Input() title: string | undefined;
  @Input() buttonLabel: string | undefined;
  @Input() routerLink: string | undefined;
  @Input() content: string | undefined;
  @Input() btn_data: any[] | undefined;

  ngOnInit() {
    this.updateButtonVisibility(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateButtonVisibility(event.target.innerWidth);
  }

  private updateButtonVisibility(screenWidth: number) {
    if (screenWidth < 1200 && this.btn_data && this.btn_data.length > 1) {
      this.isButtonListShown = false;
    } else {
      this.isButtonListShown = true;
    }
  }
}