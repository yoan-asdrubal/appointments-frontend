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

    it('should show selected view mode with color primary and others with color default', function () {
        cy.visit('/appointment');
        cy.get(`[data-cy="btn-month-view"]`).should("have.class", 'mat-primary');
        cy.get(`[data-cy="btn-week-view"]`).should("not.have.class", 'mat-primary');
        cy.get(`[data-cy="btn-day-view"]`).should("not.have.class", 'mat-primary');

        cy.get(`[data-cy="btn-week-view"]`).click();
        cy.get(`[data-cy="btn-week-view"]`).should("have.class", 'mat-primary');
        cy.get(`[data-cy="btn-month-view"]`).should("not.have.class", 'mat-primary');
        cy.get(`[data-cy="btn-day-view"]`).should("not.have.class", 'mat-primary');

        cy.get(`[data-cy="btn-day-view"]`).click();
        cy.get(`[data-cy="btn-day-view"]`).should("have.class", 'mat-primary');
        cy.get(`[data-cy="btn-month-view"]`).should("not.have.class", 'mat-primary');
        cy.get(`[data-cy="btn-week-view"]`).should("not.have.class", 'mat-primary');
    });

    it('should show navigation date pressed with color primary and others with color default', function () {
        cy.visit('/appointment');
        cy.get(`[data-cy="action-today"]`).should("have.class", 'mat-primary');
        cy.get(`[data-cy="action-prev"]`).should("not.have.class", 'mat-primary');
        cy.get(`[data-cy="action-next"]`).should("not.have.class", 'mat-primary');

        cy.get(`[data-cy="action-prev"]`).click();
        cy.get(`[data-cy="action-prev"]`).should("have.class", 'mat-primary');
        cy.get(`[data-cy="action-today"]`).should("not.have.class", 'mat-primary');
        cy.get(`[data-cy="action-next"]`).should("not.have.class", 'mat-primary');


        cy.get(`[data-cy="action-next"]`).click();
        cy.get(`[data-cy="action-next"]`).should("have.class", 'mat-primary');
        cy.get(`[data-cy="action-prev"]`).should("not.have.class", 'mat-primary');
        cy.get(`[data-cy="action-today"]`).should("not.have.class", 'mat-primary');
    });

    it('should not include weekends when month and week view mode', function () {
        cy.visit('/appointment');

        cy.get('mwl-calendar-month-view-header .cal-weekend').should('have.length', 0);

        cy.get(`[data-cy="btn-week-view"]`).click();

        cy.get('mwl-calendar-week-view-header div div').should('have.length', 5);
        cy.get('mwl-calendar-week-view-header div div').its(0).should('contain.text', 'Monday');
    });

    it('should show hours between 8:00 AM and 5:00 PM', function () {
        cy.visit('/appointment');
        cy.get(`[data-cy="btn-week-view"]`).click();
        cy.get('.cal-time-label-column .cal-hour-segment.cal-hour-start').its(0).should('contain.text', '8 AM');
        cy.get('.cal-time-label-column .cal-hour-segment.cal-hour-start').its('length').then((size) => {
            cy.get('.cal-time-label-column .cal-hour-segment.cal-hour-start').its(size - 1).should('contain.text', '5 PM');
        });

        cy.get(`[data-cy="btn-day-view"]`).click();
        cy.get('.cal-day-columns .cal-hour-segment.cal-hour-start').its(0).should('contain.text', '8 AM');
        cy.get('.cal-day-columns .cal-hour-segment.cal-hour-start').its('length').then((size) => {
            cy.get('.cal-day-columns .cal-hour-segment.cal-hour-start').its(size - 1).should('contain.text', '5 PM');
        });
    });

    it('should show dialog to add appointment from context menu', function () {
        cy.visit('/appointment');

        const checkMenuContext = () => {
            cy.get('.sh-context-menu').should('have.length', 1);
            cy.get('.sh-context-menu--item').its(0).should('contain.text', 'Add appointment');
            cy.get('.sh-context-menu--item div').its(0).click();

            cy.get('app-appointment-dialog').should('have.length', 1);
            cy.get('app-appointment-dialog input').its(0).type('{esc}');
        };
        cy.get('mwl-calendar-month-cell').its(0).rightclick();
        checkMenuContext();

        cy.get(`[data-cy="btn-week-view"]`).click();
        cy.get('.cal-day-headers .cal-header').its(0).rightclick();
        checkMenuContext();

        cy.get('mwl-calendar-week-view-hour-segment').its(0).rightclick();
        checkMenuContext();

        cy.get(`[data-cy="btn-day-view"]`).click();
        cy.get('mwl-calendar-week-view-hour-segment').its(0).rightclick();
        checkMenuContext();

    });
})
