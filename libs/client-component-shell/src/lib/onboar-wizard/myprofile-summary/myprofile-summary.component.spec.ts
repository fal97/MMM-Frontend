import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyprofileSummaryComponent } from './myprofile-summary.component';

describe('MyprofileSummaryComponent', () => {
  let component: MyprofileSummaryComponent;
  let fixture: ComponentFixture<MyprofileSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyprofileSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyprofileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
