describe('Appointment Dialog', () => {
    const addZeroToDigit = (digit) => {
        if (+digit < 10)
            return `0${digit}`;
        return digit;
    };

    it('should show dialog with values from any day in calendar MONTH view mode', function () {
        cy.visit('/appointment');
        let pos = 0;

        cy.get('mwl-calendar-month-cell').its('length')
            .then((length) => {
                pos = (Math.floor((Math.random() * length)));
                cy.get('mwl-calendar-month-cell').its(pos).rightclick();

                cy.get('.sh-context-menu--item div').its(0).click();
                cy.get('app-appointment-dialog').should('have.length', 1);

                console.log('pos', pos);

                cy.get('mwl-calendar-month-cell > div').its(pos).invoke('attr', 'date')
                    .then((val) => {
                        const date = new Date(val);
                        const dateStr = `${addZeroToDigit(date.getMonth() + 1)}-${addZeroToDigit(date.getDate())}-${date.getFullYear()}`;

                        const hour = addZeroToDigit(date.getHours() > 12 ? date.getHours() - 12 : date.getHours());
                        const minutes = addZeroToDigit(date.getMinutes());
                        const timeInit = date.toString().indexOf('00:00:00') > -1 ? '8:00 AM' : `${hour}:${minutes}${date.getHours() < 12 ? ' AM' : ' PM'}`;
                        const timeEnd = '5:00 PM';
                        cy.get('[data-cy="appointment-date"]').should('have.value', dateStr);
                        cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                        cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                        cy.get('[data-cy="appointment-timeEnd"]').should('have.value', timeEnd);
                    });
            });
    });
    it('should show dialog with values when create from any time of random day calendar WEEK view mode', function () {
        cy.visit('/appointment');
        cy.get(`[data-cy="btn-week-view"]`).click();
        let pos = 0;
        cy.get('.cal-hour-segment:not([date*="17:30"])').as('query');
        cy.get('@query').its('length')
            .then((length) => {
                pos = (Math.floor((Math.random() * length)));
                cy.get('@query').its(pos).rightclick();

                cy.get('.sh-context-menu--item div').its(0).click();
                cy.get('app-appointment-dialog').should('have.length', 1);

                console.log('pos', pos);

                cy.get('@query').its(pos).invoke('attr', 'date')
                    .then((val) => {
                        const date = new Date(val);
                        const dateStr = `${addZeroToDigit(date.getMonth() + 1)}-${addZeroToDigit(date.getDate())}-${date.getFullYear()}`;

                        const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
                        const minutes = addZeroToDigit(date.getMinutes());
                        const timeInit = date.toString().indexOf('00:00:00') > -1 ? '8:00 AM' : `${hour}:${minutes}${date.getHours() < 12 ? ' AM' : ' PM'}`;
                        const timeEnd = '5:00 PM';
                        cy.get('[data-cy="appointment-date"]').should('have.value', dateStr);
                        cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                        cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                        cy.get('[data-cy="appointment-timeEnd"]').should('have.value', timeEnd);
                    });
            });
    });

    it('should show dialog with values when create from random header of WEEK view mode', function () {
        cy.visit('/appointment');
        cy.get(`[data-cy="btn-week-view"]`).click();
        let pos = 0;
        cy.get('.cal-header').as('query');
        cy.get('@query').its('length')
            .then((length) => {
                pos = (Math.floor((Math.random() * length)));
                cy.get('@query').its(pos).rightclick();

                cy.get('.sh-context-menu--item div').its(0).click();
                cy.get('app-appointment-dialog').should('have.length', 1);

                console.log('pos', pos);

                cy.get('@query').its(pos).invoke('attr', 'date')
                    .then((val) => {
                        const date = new Date(val);
                        const dateStr = `${addZeroToDigit(date.getMonth() + 1)}-${addZeroToDigit(date.getDate())}-${date.getFullYear()}`;

                        const timeInit = '8:00 AM';
                        const timeEnd = '5:00 PM';
                        cy.get('[data-cy="appointment-date"]').should('have.value', dateStr);
                        cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                        cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                        cy.get('[data-cy="appointment-timeEnd"]').should('have.value', timeEnd);
                    });
            });
    });

    it('should show dialog with values when create from random hour of DAY view mode ', function () {
        cy.visit('/appointment');
        cy.get(`[data-cy="btn-day-view"]`).click();
        let pos = 0;
        cy.get('.cal-hour-segment:not([date*="17:30"])').as('query');
        cy.get('@query').its('length')
            .then((length) => {
                pos = (Math.floor((Math.random() * length)));
                cy.get('@query').its(pos).rightclick();

                cy.get('.sh-context-menu--item div').its(0).click();
                cy.get('app-appointment-dialog').should('have.length', 1);

                console.log('pos', pos);

                cy.get('@query').its(pos).invoke('attr', 'date')
                    .then((val) => {
                        const date = new Date(val);
                        const dateStr = `${addZeroToDigit(date.getMonth() + 1)}-${addZeroToDigit(date.getDate())}-${date.getFullYear()}`;

                        const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
                        const minutes = addZeroToDigit(date.getMinutes());
                        const timeInit = date.toString().indexOf('00:00:00') > -1 ? '8:00 AM' : `${hour}:${minutes}${date.getHours() < 12 ? ' AM' : ' PM'}`;
                        const timeEnd = '5:00 PM';
                        cy.get('[data-cy="appointment-date"]').should('have.value', dateStr);
                        cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                        cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                        cy.get('[data-cy="appointment-timeEnd"]').should('have.value', timeEnd);
                    });
            });
    });
})
