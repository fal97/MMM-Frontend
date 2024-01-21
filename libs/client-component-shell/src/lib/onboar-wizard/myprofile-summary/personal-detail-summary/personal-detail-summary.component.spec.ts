import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalDetailSummaryComponent } from './personal-detail-summary.component';

describe('PersonalDetailSummaryComponent', () => {
  let component: PersonalDetailSummaryComponent;
  let fixture: ComponentFixture<PersonalDetailSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalDetailSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalDetailSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
