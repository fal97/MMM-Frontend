import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleWithButtonComponent } from './title-with-button.component';

describe('TitleWithButtonComponent', () => {
  let component: TitleWithButtonComponent;
  let fixture: ComponentFixture<TitleWithButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleWithButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleWithButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
