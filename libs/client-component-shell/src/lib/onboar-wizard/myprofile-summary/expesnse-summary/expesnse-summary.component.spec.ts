import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpesnseSummaryComponent } from './expesnse-summary.component';

describe('ExpesnseSummaryComponent', () => {
  let component: ExpesnseSummaryComponent;
  let fixture: ComponentFixture<ExpesnseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpesnseSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpesnseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
