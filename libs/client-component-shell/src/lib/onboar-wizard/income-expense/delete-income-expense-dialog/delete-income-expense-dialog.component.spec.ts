import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteIncomeExpenseDialogComponent } from './delete-income-expense-dialog.component';

describe('DeleteIncomeExpenseDialogComponent', () => {
  let component: DeleteIncomeExpenseDialogComponent;
  let fixture: ComponentFixture<DeleteIncomeExpenseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteIncomeExpenseDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteIncomeExpenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
