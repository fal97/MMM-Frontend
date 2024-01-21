import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientRequestJoinComponent } from './client-request-join.component';

describe('ClientRequestJoinComponent', () => {
  let component: ClientRequestJoinComponent;
  let fixture: ComponentFixture<ClientRequestJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientRequestJoinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientRequestJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
