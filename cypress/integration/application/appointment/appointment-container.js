describe('Appointment Container', () => {
    it('should render calendar month view by default', () => {
        cy.visit('/appointment');
        cy.get('app-appointment-container mwl-calendar-month-view').should('have.length', 1);
        cy.get('app-appointment-container mwl-calendar-week-view').should('have.length', 0);
        cy.get('app-appointment-container mwl-calendar-day-view').should('have.length', 0);

        cy.get('[data-cy="btn-month-view"]').should('have.class', 'active');

    });

    it('should change view mode when click on buttons view mode', () => {
        cy.visit('/appointment');
        const select = (type) => {
            cy.get(`[data-cy="btn-${type}-view"]`).click();
            cy.get(`[data-cy="btn-${type}-view"]`).should('have.class', 'active');

            cy.get(`app-appointment-container mwl-calendar-${type}-view`).should('have.length', 1);
            cy.get('[data-cy="calendar-content"] > *').should('have.length', 1);
        };

        select('week');
        select('day');
        select('month');

    });
})
