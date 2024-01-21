import { TestBed } from '@angular/core/testing';
import { AdminLoginComponent } from './admin-login.component';
import { AuthService } from '@frontend/data-access-lib';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe(AdminLoginComponent.name, () => {
  const email = 'test@gmail.com';
  const password = '123new';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule],
      declarations: [AdminLoginComponent],
      providers: [AuthService, FormBuilder],
    });
  });

  it('renders', () => {
    cy.mount(AdminLoginComponent);
  });

  it('should render title with default text', () => {
    cy.mount(AdminLoginComponent);
    cy.get('h2').should('have.text', 'Log in');
  });

  it('should have password input of type password', () => {
    cy.mount(AdminLoginComponent);
    cy.get('.password').should('have.attr', 'type', 'password');
  });

  it('should have email input of type text', () => {
    cy.mount(AdminLoginComponent);
    cy.get('.email').should('have.attr', 'type', 'email');
  });

  it('Check password input field for placeholder', () => {
    cy.mount(AdminLoginComponent);
    cy.get('.password').should('have.attr', 'placeholder', 'Password');
  });

  it('Check email input field for placeholder', () => {
    cy.mount(AdminLoginComponent);
    cy.get('.email').should('have.attr', 'placeholder', 'Email');
  });

  it('Type title and description', () => {
    cy.mount(AdminLoginComponent);
    cy.get(".email").type('test@gmail.com');
    cy.get(".password").type('test123');
    cy.get(".loginbtn").click();
  });
});


