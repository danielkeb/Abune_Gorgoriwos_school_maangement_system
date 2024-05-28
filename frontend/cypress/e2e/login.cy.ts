/// <reference types="cypress" />

describe('template spec', () => {
  it('passes', () => {
    // Increase the timeout to 60 seconds
    cy.visit('http://localhost:3000', { timeout: 60000 });
  });
});

// cypress/integration/signin.spec.ts

describe('Sign In', () => {
  it('should sign in successfully with correct credentials', () => {
    cy.visit('http://localhost:3000/login');

    // Fill in the email and password fields
    cy.get('#email').type('binyamseleshe@gmail.com');
    cy.get('#password').type('1234');

    // Click the submit button
    cy.get('button').contains('Submit').click();

    // Check if redirected to the dashboard
    cy.url().should('include', 'dashboard');
    // cy.contains('Welcome Back').should('be.visible');
  });

  // it('should show an error message with incorrect credentials', () => {
  //   cy.visit('http://localhost:3000/login');

  //   // Fill in the email and password fields with incorrect credentials
  //   cy.get('#email').type('wrongemail@gmail.com');
  //   cy.get('#password').type('wrongpassword');

  //   // Click the submit button
  //   cy.get('button').contains('Submit').click();

  //   // Check for the error message
  //   cy.contains('Sign-in failed! Error message:').should('be.visible');
  // });
});

// cypress/e2e/studentProfileSettings.cy.ts
describe("", ()=>{
  
})