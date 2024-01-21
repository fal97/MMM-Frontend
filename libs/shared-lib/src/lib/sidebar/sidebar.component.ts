import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@frontend/data-access-lib';

@Component({
  selector: 'frontend-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sharedData: boolean | undefined;

  constructor(
    private router: Router,
    public sharedService: SharedService,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('isLoggedIn');

    this.sharedService.sharedData$.subscribe((value) => {
      this.sharedData = value;
      this.applyDynamicCSS(value);
      this.cdRef.detectChanges();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  applyDynamicCSS(isClicked: boolean) {
    
    const element = this.el.nativeElement.querySelector('#elementToChange');

    if (element) {
      if (isClicked) {
        this.renderer.setStyle(element, 'display', 'grid');
         this.renderer.setStyle(element, 'font-size', '16px');
      } else {
        // Apply different CSS when isActive is false
        this.renderer.setStyle(element, 'display', 'grid');
        this.renderer.setStyle(element, 'font-size', '16px');
       }
    }
  }
}
