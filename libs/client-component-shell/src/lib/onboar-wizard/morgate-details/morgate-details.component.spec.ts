import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MorgateDetailsComponent } from './morgate-details.component';

describe('MorgateDetailsComponent', () => {
  let component: MorgateDetailsComponent;
  let fixture: ComponentFixture<MorgateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MorgateDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MorgateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
