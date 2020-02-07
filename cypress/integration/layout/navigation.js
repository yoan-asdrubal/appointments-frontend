describe('Navigation component', () => {
    it('should render ToHComponent when access to root route', function () {
        cy.visit('/pathNoFound');
        cy.get('[data-cy="appointment-route"]').click();
        cy.get('app-appointment-container').should('have.length', 1);
    });

})
