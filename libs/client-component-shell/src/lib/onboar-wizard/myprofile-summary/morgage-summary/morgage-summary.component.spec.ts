import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MorgageSummaryComponent } from './morgage-summary.component';

describe('MorgageSummaryComponent', () => {
  let component: MorgageSummaryComponent;
  let fixture: ComponentFixture<MorgageSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MorgageSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MorgageSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
