import { TestBed } from '@angular/core/testing';
import { ClientListComponent } from './client-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppState } from '@frontend/state-management-lib';

describe(ClientListComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        StoreModule.forRoot(AppState),
      ],
      declarations: [ClientListComponent],
      providers: [],
    });
  });

  it('renders', () => {
    cy.mount(ClientListComponent);
  });
});
