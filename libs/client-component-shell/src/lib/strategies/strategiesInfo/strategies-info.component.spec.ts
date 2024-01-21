import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StrategiesInfoComponent } from './strategies-info.component';

describe('StrategiesInfoComponent', () => {
  let component: StrategiesInfoComponent;
  let fixture: ComponentFixture<StrategiesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrategiesInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StrategiesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
