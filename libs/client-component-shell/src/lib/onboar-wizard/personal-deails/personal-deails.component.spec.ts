import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalDeailsComponent } from './personal-deails.component';

describe('PersonalDeailsComponent', () => {
  let component: PersonalDeailsComponent;
  let fixture: ComponentFixture<PersonalDeailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalDeailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalDeailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
