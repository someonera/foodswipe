import { getGreeting } from '../support/app.po';

describe('foodswipe', () => {
  beforeEach(() => cy.visit('/login'));

  it('should display welcome message', () => {
    getGreeting().contains('Email');
  });

  it('should login', () => {
    cy.intercept('POST', '/login', {fixture: 'restaurant.json'})
    cy.visit('/login')

    // cy.login()
    // const emailControl = cy.findByRole('textbox',{name: /email/i})
    //   const passwordControl = screen.getByLabelText(/password/i)

    //   userEvent.type(emailControl, 'test@email.com')
    //   userEvent.type(passwordControl, 'password')

    //   expect(emailControl).toHaveValue('test@email.com')
    //   expect(passwordControl).toHaveValue('password')

    //   const form = screen.getByRole('form')
    //   expect(form).toHaveFormValues({
    //     email: 'test@email.com',
    //     password: 'password'
    //   })

    // userEvent.click(screen.getByRole('button'))


  })


});