import { TestBed } from '@angular/core/testing';
import { UpdateClientComponent } from './update-client.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppState } from '@frontend/state-management-lib';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";

describe(UpdateClientComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        StoreModule.forRoot(AppState),
        RouterTestingModule
      ],
      declarations: [UpdateClientComponent],
      providers: [],
    });
  });

  it('renders', () => {
    cy.mount(UpdateClientComponent);
  });
});
