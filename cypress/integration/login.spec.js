/* eslint-disable no-undef */
describe('App Inventory', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('LoginPage Open', () => {
    cy.contains('Inicio de Sesión');
  });

  it('Running Login', () => {
    cy.get('input[name="userName"]').type('ajimenez');
    cy.get('input[name="password"]').type('123456');
    cy.contains('INICIAR SESIÓN').click();
    cy.contains('Inventario de Almacen');
  });
});
