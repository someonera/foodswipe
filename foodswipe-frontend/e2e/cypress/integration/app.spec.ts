import { getGreeting } from '../../src/app.po'

describe('foodswipe', () => {
  beforeEach(() => cy.visit('/login'));

  it('should display welcome message', () => {
    getGreeting().contains('Email');
  });

  it('should login', async () => {
    cy.intercept('POST', '/login', {fixture: 'restaurant.json'})
    cy.visit('/login')

    cy.findByRole('textbox',{name: /email/i}).type('test@email.com')
    cy.findByLabelText(/password/i).type('password')

    cy.findByRole('button').click()

  })


});