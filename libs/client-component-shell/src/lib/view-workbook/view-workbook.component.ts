import { Component ,AfterViewInit,ViewChild,OnInit, EventEmitter, Output} from '@angular/core';
import { IncomeComponent } from '../onboar-wizard/income-expense/income/income.component';
import { ExpenseComponent } from '../onboar-wizard/income-expense/expense/expense.component';
import { PersonalDeailsComponent } from '../onboar-wizard/personal-deails/personal-deails.component';
import { IncomeExpenseComponent } from '../onboar-wizard/income-expense/income-expense.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FrequencyType, LoanType, MmmClientService,MmmMorgageDetailService, loanPeriod, morgagrFrequency } from '@frontend/data-access-lib';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import {
  AppStateModel,
  getcountry,
  loadcountries,
} from '@frontend/state-management-lib';

@Component({
  selector: 'frontend-view-workbook',
  templateUrl: './view-workbook.component.html',
  styleUrls: ['./view-workbook.component.css'],
})
export class ViewWorkbookComponent implements AfterViewInit,OnInit{

  @Output() incomeDetailscheck: EventEmitter<boolean> = new EventEmitter();
  @Output() expenseDetailscheck: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('IncomeDetailsComponent') incomeDetailsComponent:
    | IncomeComponent
    | undefined;
  @ViewChild('ExpenseDetailsComponent') expenseDetailsComponent:
    | ExpenseComponent
    | undefined;


  personalDetailsSummaryForm!: FormGroup;
  clientId: any;
  mortgageDetailSummayForm!: FormGroup;
  loanPeriodTypes:any;
  frequencyType: any
  countries:any=[];
  

  form1!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mmmClientService: MmmClientService,
    private mmmMorgageService: MmmMorgageDetailService,
    private store: Store<AppStateModel>,
  ) {}

  @ViewChild('IncomeExpenseDetailsComponent') incomeExpenseDetailsComponent:
    | IncomeExpenseComponent
    | undefined;

    ngAfterViewInit() {
      this.form1 = this.incomeExpenseDetailsComponent?.frmStepTwo as FormGroup;

      this.getExpesne();
      this.getIncomes();
    
    }

    ngOnInit() {
      this.loanPeriodTypes = loanPeriod;
      this.frequencyType = morgagrFrequency;
      this.clientId = localStorage.getItem('clientId');
      this.mortgageDetailSummayForm = this.formBuilder.group({
        id: [0],
      loanAmount: ['', Validators.required],
      interestRate: ['', Validators.required],
      startDate: [0, Validators.required],
      loanPeriod: ['', Validators.required],
      loanType: [0, Validators.required],
      frequency: [0, Validators.required],
      periodicPayment: ['', Validators.required],
      totalInterestPaid: ['', [Validators.required]],
      clientId: Number(this.clientId),
      });
      this.getMorgageDetailsByClientId(Number(this.clientId));

      
      this.personalDetailsSummaryForm = this.formBuilder.group({
        // Define your form controls here
        id:[0,Validators.required],
        name: ['',Validators.required],
        email: ['',Validators.required],
        contactNumber: ['',Validators.required],
        occupations: ['',Validators.required],
        streetAddress: ['',Validators.required],
        town: ['',Validators.required],
        state: ['',Validators.required],
        postCode: ['',Validators.required],
        country: ['',Validators.required]
      });
      this.getClientById(Number(this.clientId));

      this.getCountries();
    }

    getIncomes() {
      this.incomeDetailsComponent?.getIncomes();
    }
  
    getExpesne() {
      this.expenseDetailsComponent?.getExpenses();
    }


    getCountries() {
      this.store.dispatch(loadcountries());
      this.store.select(getcountry).subscribe((item) => {
        console.log("=====item country",item);
        this.countries = item;
      });
    }
    
  
    getClientById(clientId: number) {
      this.mmmClientService.getClientById(clientId).subscribe((data) => {
        console.log("======== personal data summry",data);
        
        this.personalDetailsSummaryForm.patchValue(data);
      });
    }

    getMorgageDetailsByClientId(id: number) {
      this.mmmMorgageService.getMorgageById(id).subscribe((data: any) => {
        this.mortgageDetailSummayForm.patchValue(data);
      });
    }
  
    cancelForm(){
      this.getClientById(Number(this.clientId));
      this.getMorgageDetailsByClientId(Number(this.clientId));
      this.incomeDetailsComponent?.addNewIncomeForm.reset();
      this.expenseDetailsComponent?.addNewExpenseForm.reset();


    }

    save(){
      
      this.mmmClientService.update(this.personalDetailsSummaryForm.value).subscribe((data) => {
        const value = this.mortgageDetailSummayForm.value;
        const formattedStartDate =moment(value.startDate).format('YYYY-MM-DD');;
        value.startDate = formattedStartDate;
  
        this.mmmMorgageService.addMorgageDetail(value).subscribe((data) => {
          Swal.fire(
            'Success',
            `Details Updated Successfully!`
            
          );
           
        })
      })
    } 
}
