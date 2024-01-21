import { TestBed } from '@angular/core/testing';
import { AddNewClientComponent } from './add-new-client.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppState } from '@frontend/state-management-lib';
import { ReactiveFormsModule } from '@angular/forms';

describe(AddNewClientComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        StoreModule.forRoot(AppState),
        ReactiveFormsModule
      ],
      declarations: [AddNewClientComponent],
      providers: [],
    });
  });

  it('cancel button', () => {
    cy.mount(AddNewClientComponent);
    cy.get('.btn-cancle').contains('Cancel')
  });

  // it('when button submit should call', () => {
  //   cy.mount(AddNewClientComponent).then(response => {
  //     cy.spy(response.component.createClient).as('onSubmit')
  //     cy.get('.create').click();
  //     cy.get('@onSubmit').should('be.disabled')
  //   })
  // })

  

  // it('should add client', () => {
  //   cy.mount(AddNewClientComponent);
  //   cy.get('[formcontrolname="name"]').type('John');
  //   cy.get('[formcontrolname="email"]').type('john@gmail.com');
  //   cy.get('[formcontrolname="contactNumber"]').type('4455555555');
  //   cy.get('[formcontrolname="occupation"]').type('se');
  //   cy.get('[formcontrolname="streetAddress"]').type('332/A');
  //   cy.get('[formcontrolname="town"]').type('panadura');
  //   cy.get('[formcontrolname="state"]').type('western');
  //   cy.get('[formcontrolname="postCode"]').type('1234');
  //   cy.get('[formcontrolname="country"]').type('Australia');
  //   // cy.get('[formcontrolname="workshop"]').select('Monei Morgage Mastery -July');
  //   cy.get('mat-select[formControlName=workshop]').click().get('mat-option').contains('Monei Morgage Mastery -July')

  //   cy.get('form').submit();
  // });

  // it('should name input be validate', () => {
  //   cy.mount(AddNewClientComponent);
  //   cy.get('[formcontrolname="name"]').type('John');
    
  // });

  // it('cancel button', () => {
  //   cy.mount(AddNewClientComponent);
  //   cy.log("==ee",cy.get('.btn-cancle'))
  //   // cy.get('.btn-cancle').contains('Cancel').click();
  // });

});



