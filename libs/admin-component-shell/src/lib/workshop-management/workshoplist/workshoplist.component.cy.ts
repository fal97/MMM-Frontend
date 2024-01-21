import { TestBed } from '@angular/core/testing';
import { WorkshoplistComponent } from './workshoplist.component';

describe(WorkshoplistComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // HttpClientTestingModule,
        // NoopAnimationsModule,
        // StoreModule.forRoot(AppState),
      ],
      declarations: [WorkshoplistComponent],
      providers: [],
    });
  });

  it('renders', () => {
    cy.mount(WorkshoplistComponent);
  });
});
