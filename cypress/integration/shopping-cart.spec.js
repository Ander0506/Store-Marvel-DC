/* eslint-disable no-undef */
describe('App Inventory', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Homepage Open', () => {
    cy.contains('Lista de Productos');
  });

  it('Button Cart Shopping Disabled', () => {
    cy.get('div.rs-badge-content').should('have.text', '0').siblings('button').should('be.disabled');
  });

  it('Input amount in 0', () => {
    cy.get('div.rs-flex-box-grid-item.rs-flex-box-grid-item-16 input.rs-input').should('have.attr', 'value', '0');
  });

  it('Funcionality button increment and decrement amount', () => {
    let stock;
    cy.contains('Unidades disponibles').should(($p) => {
      stock = Cypress.$($p).attr('data-test-id');
    });
    cy.contains('-').click().siblings('div.rs-input-group').get('input.rs-input').should('have.attr', 'value', '0');
    cy.contains('Unidades disponibles').should(($p) => {
      expect(Cypress.$($p).attr('data-test-id')).to.contain(stock);
    });
    cy.contains('+').click().siblings('div.rs-input-group').get('input.rs-input').should('have.attr', 'value', '1');
    cy.contains('Unidades disponibles').should(($p) => {
      expect(Cypress.$($p).attr('data-test-id')).to.contain(stock - 1);
    });
  });

  it('Runnig shopping cart', () => {
    let stock;
    cy.contains('Añadir al Carrito').should('be.disabled');
    cy.contains('Unidades disponibles').should(($p) => {
      stock = Cypress.$($p).attr('data-test-id');
    });
    cy.contains('+').click();
    cy.contains('Añadir al Carrito').should('be.not.disabled').click();
    cy.get('div.rs-badge-content').should('have.text', '1').siblings('button').should('be.not.disabled');
    cy.contains('Añadir al Carrito').should('be.disabled');
    cy.get('div.rs-badge-content').should('have.text', '1').siblings('button').should('be.not.disabled').click();
    cy.get('button.rs-btn-red').should('have.text', 'Eliminar').should('have.length', '1').click();
    cy.contains('Lista Vacía');
    cy.get('span.rs-btn-close').click();
    cy.contains('Unidades disponibles').should(($p) => {
      expect(Cypress.$($p).attr('data-test-id')).to.contain(stock);
    });
  });
});
