import { getGreeting } from '../support/app.po';

describe('foodswipe', () => {
  beforeEach(() => cy.visit('/login'));

  it('should display welcome message', () => {
    getGreeting().contains('Email');
  });
});