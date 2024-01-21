import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CsvUploadWizardComponent } from './csv-upload-wizard.component';

describe('CsvUploadWizardComponent', () => {
  let component: CsvUploadWizardComponent;
  let fixture: ComponentFixture<CsvUploadWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CsvUploadWizardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CsvUploadWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
