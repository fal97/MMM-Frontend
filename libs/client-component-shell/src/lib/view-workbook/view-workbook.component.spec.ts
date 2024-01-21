import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewWorkbookComponent } from './view-workbook.component';

describe('ViewWorkbookComponent', () => {
  let component: ViewWorkbookComponent;
  let fixture: ComponentFixture<ViewWorkbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewWorkbookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewWorkbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
