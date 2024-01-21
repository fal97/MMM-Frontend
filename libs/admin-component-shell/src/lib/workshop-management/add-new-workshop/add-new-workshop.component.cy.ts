import { TestBed } from '@angular/core/testing';
import { AddNewWorkshopComponent } from './add-new-workshop.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppState } from '@frontend/state-management-lib';
import { ReactiveFormsModule } from '@angular/forms';

describe(AddNewWorkshopComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        StoreModule.forRoot(AppState),
        ReactiveFormsModule
      ],
      declarations: [AddNewWorkshopComponent],
      providers: [],
    });
  });

  it('renders', () => {
    cy.mount(AddNewWorkshopComponent);
  });
});
